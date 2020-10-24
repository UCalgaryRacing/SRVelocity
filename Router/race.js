"use strict";

const express = require("express");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];
const Joi = require("@hapi/joi");
//const sanitizeInputs = require("../Util/helperFunctions");
const api = require("../Util/call");
const race = express.Router();

race.get("/:vehicleId/:raceId/logs", withAnyAuth, async (req, res) => {
  const response = await api.call(`race/${req.params.vehicleId}/${req.params.raceId}/logs`, "GET", {
    searchParams: {
      APIKey: req.user.APIKey,
    },
  });
  res.status(response.status).json(response.body);
});

race.post("/:vehicleId", withAdminAuth, async (req, res) => {
  const response = await api.call(`race/${req.params.vehicleId}`, "POST", {
    serachParams: {
      APIKey: req.user.APIKey,
    },
  });
  res.status(response.status).json(response.body);
});

race.post("/:vehicleId/:raceId/end", withAdminAuth, async (req, res) => {
  const response = await api.call(`race/${req.params.vehicleId}/${req.params.raceId}/end`, "POST", {
    searchParams: req.user.APIKey,
  });
  res.status(response.status).json(response.body);
});

race.get("/getRaceCSV/:vehicleId/:raceId", withAnyAuth, async (req, res) => {
  //Validate the request
  const checkParamsNotBody = 1;
  const result = await sanitizeInputs(req, res, apiKeySchema, getRaceLogSchema, checkParamsNotBody);
  if (result < 0) return;
  //Execute the stored function
  database
    .func("getLogs", [req.user.APIKey, req.params.vehicleId, req.params.raceId])
    .then((data) => {
      // Connect to logConverter, which does processing to convert JSON object to CSV format.
      var socket = io.connect("http://localhost:5000", {
        reconnect: false,
        transports: ["websocket"],
      });
      socket.on("connect", () => {
        database
          .func("getSensors", [req.user.APIKey, req.params.vehicleId])
          .then((sensors) => {
            socket.emit("generateCSV", { data: data[0].getLogs, sensors: sensors[0].getSensors });
            socket.on("data", (fileName) => {
              // Send the file
              const stat = fs.statSync(fileName);
              res.writeHead(200, {
                "Content-Type": "text/csv",
                "Content-Length": stat.size,
              });
              // Read file created by logConverter.
              var readStream = fs.createReadStream(fileName);
              readStream.pipe(res);
              // Delete the temporary csv file
              fs.unlink(fileName, (err) => {
                if (err) console.log(err);
              });
              socket.close();
            });
            socket.on("error", (error) => {
              res.status(500).send("Error generating CSV!").end();
            });
          })
          .catch((error) => {
            res.status(500).send("Error!").end();
          });
      });
    })
    .catch((error) => {
      res.status(500).send("Error!").end();
    });
});

module.exports = race;
