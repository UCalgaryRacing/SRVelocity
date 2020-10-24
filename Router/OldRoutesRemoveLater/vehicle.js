"use strict";

const database = require("../Configuration/postgreSQL");
const express = require("express");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];
const Joi = require("@hapi/joi");
const apiKeySchema = require("../Middleware/sanitizeAuth");
const sanitizeInputs = require("./helperFunctions");
const vehicle = express.Router();

vehicle.get("/getVehicles", withAnyAuth, async (req, res) => {
  //Validate the request
  const result = await sanitizeInputs(req, res, apiKeySchema);
  if (result < 0) return;
  //Execute the stored function
  database
    .func("getVehicles", req.user.APIKey)
    .then((data) => {
      res.status(200).json(data[0].getVehicles).end();
    })
    .catch((error) => {
      res.status(500).send("Error!").end();
    });
});

const postVehicleSchema = Joi.object({
  name: Joi.string().max(50).required(),
});

vehicle.post("/postVehicle", withAdminAuth, async (req, res) => {
  //Validate the request
  const checkParamsNotBody = 0;
  const result = await sanitizeInputs(
    req,
    res,
    apiKeySchema,
    postVehicleSchema,
    checkParamsNotBody
  );
  if (result < 0) return;
  //Execute the stored procedure
  database
    .func("postVehicle", [req.user.APIKey, req.body.name])
    .then((data) => {
      res.status(200).send({ ID: data[0].rv }).end();
    })
    .catch((error) => {
      res.status(500).send({ error: "Error!" }).end();
    });
});

vehicle.put("/putVehicle/:vehicleId", withAdminAuth, async (req, res) => {
  //Validate the request
  const checkParamsNotBody = 0;
  const result = await sanitizeInputs(
    req,
    res,
    apiKeySchema,
    postVehicleSchema,
    checkParamsNotBody
  );
  if (result < 0) return;
  //Execute the stored procedure
  database
    .proc("putVehicle", [req.params.vehicleId, req.body.name])
    .then((data) => {
      res.status(200).send({ msg: "Success!" }).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: "Error!" }).end();
    });
});

const deleteVehicleSchema = Joi.object({});

vehicle.delete("/deleteVehicle/:vehicleId", withAdminAuth, async (req, res) => {
  //Validate the request
  const checkParamsNotBody = 0;
  const result = await sanitizeInputs(
    req,
    res,
    apiKeySchema,
    deleteVehicleSchema,
    checkParamsNotBody
  );
  if (result < 0) return;
  //Execute the stored procedure
  database
    .proc("deleteVehicle", [req.params.vehicleId])
    .then((data) => {
      res.status(200).send({ msg: "Success!" }).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: "Error!" }).end();
    });
});

module.exports = vehicle;
