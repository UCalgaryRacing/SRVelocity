/**
 * Race logs endpoint.
 *
 * Used to retrieve race logs in json format, retrieve logs in csv format,
 * specify the end of a race log, and add a new race log to the database.
 **/
"use strict";

const database = require("../Configuration/postgreSQL");
const express = require("express");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];
const fs = require("fs");
const io = require("socket.io-client");
const Joi = require("@hapi/joi");
const apiKeySchema = require("../Middleware/sanitizeAuth");
const sanitizeInputs = require("./helperFunctions");
const race = express.Router();

//GET endpoints
const getRaceLogSchema = Joi.object({
    vehicleId: Joi.number().integer().required(),
    raceId: Joi.number().integer().required()
});

race.get("/getLogs/:vehicleId/:raceId", withAnyAuth, async (req, res) => {
    //Validate the request
    const checkParamsNotBody = 1; // Check req.params, not req.body
    const result = await sanitizeInputs(req, res, apiKeySchema, getRaceLogSchema, checkParamsNotBody);
    if (result < 0) return;
    //Execute the stored function
    database.func("getLogs", [req.user.APIKey, req.params.vehicleId, req.params.raceId])
        .then(data => {
            res.status(200).json(data[0].getLogs).end();
        })
        .catch(error => {
            res.status(200).send("Error!").end();
        });
});

race.get("/getRaceCSV/:vehicleId/:raceId", withAnyAuth, async (req, res) => {
    //Validate the request
    const checkParamsNotBody = 1;
    const result = await sanitizeInputs(req, res, apiKeySchema, getRaceLogSchema, checkParamsNotBody);
    if (result < 0) return;
    //Execute the stored function
    database.func("getLogs", [req.user.APIKey, req.params.vehicleId, req.params.raceId])
        .then(data => {
            // Connect to logConverter, which does processing to convert JSON object to CSV format.
            var socket = io.connect("http://localhost:5000", {
                reconnect: false,
                transports: ["websocket"]
            });
            socket.on("connect", () => {
                database.func("getSensors", [req.user.APIKey, req.params.vehicleId])
                    .then(sensors => {
                        socket.emit("generateCSV", { data: data[0].getLogs, sensors: sensors[0].getSensors});
                        socket.on("data", fileName => {
                            // Send the file
                            const stat = fs.statSync(fileName);
                            res.writeHead(200, {
                                "Content-Type": "text/csv",
                                "Content-Length": stat.size
                            });
                            // Read file created by logConverter.
                            var readStream = fs.createReadStream(fileName);
                            readStream.pipe(res);
                            // Delete the temporary csv file
                            fs.unlink(fileName, err => {
                                if (err) console.log(err);
                            });
                            socket.close();
                        });
                        socket.on("error", error => {
                            res.status(500).send("Error generating CSV!").end();
                        });
                    })
                    .catch(error => {
                        res.status(500).send("Error!").end();
                    });
            });
        })
        .catch(error => {
            res.status(500).send("Error!").end();
        });
});


//POST endpoints
const postRaceSchema = Joi.object({
    vehicleId: Joi.number().integer().required()
});

race.post("/postRace", withAdminAuth, async (req, res) => {
    //Validate the request
    const checkParamsNotBody = 0;
    const result = await sanitizeInputs(req, res, apiKeySchema, postRaceSchema, checkParamsNotBody);
    if (result < 0) return;
    //Generate the current time
    let startDate = new Date();
    startDate =
        startDate.getFullYear() + "-" +
        startDate.getMonth() + "-" +
        ("0" + startDate.getDate()).slice(-2) + "-" +
        startDate.getHours() + ":" +
        startDate.getMinutes();
    //Execute stored procedure
    database.func("postRace", [req.user.APIKey, req.body.vehicleId, startDate])
        .then(data => {
            res.status(200).json({ race_id: data[0].rv }).end();
        })
        .catch(error => {
            res.status(500).send("Error!").end();
        });
});

//PUT endpoints
race.put("/putRaceEndDate", withAdminAuth, async (req, res) => {
    //Validate the request
    const checkParamsNotBody = 0;
    const result = await sanitizeInputs(req, res, apiKeySchema, getRaceLogSchema, checkParamsNotBody);
    if (result < 0) return;
    //Generate the current time
    let endDate = new Date();
    endDate =
        endDate.getFullYear() + "-" +
        endDate.getMonth() + "-" +
        ("0" + endDate.getDate()).slice(-2) + "-" +
        endDate.getHours() + ":" +
        endDate.getMinutes();
    //Execute stored procedure
    database.proc("putRaceEndDate", [
        req.user.APIKey,
        req.body.raceId,
        req.body.vehicleId,
        endDate
    ])
        .then(data => {
            res.status(200).send("Success!").end();
        })
        .catch(error => {
            res.status(500).send("Error!").end();
        });
});

module.exports = race;
