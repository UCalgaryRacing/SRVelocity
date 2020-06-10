"use strict";

const database = require("../Configuration/postgreSQL");
const express = require("express");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];
const Joi = require("@hapi/joi");
const apiKeySchema = require("../Middleware/sanitizeAuth");
const sanitizeInputs = require("./helperFunctions");
const sensor = express.Router();

//GET endpoints
const getSensorsSchema = Joi.object({
  vehicleId: Joi.number().integer().required(),
});

sensor.get("/getSensors/:vehicleId", withAnyAuth, async (req, res) => {
  //Validate the request
  const checkParamsNotBody = 1;
  const result = await sanitizeInputs(
    req,
    res,
    apiKeySchema,
    getSensorsSchema,
    checkParamsNotBody
  );
  if (result < 0) return;
  //Execute the stored function
  database
    .func("getSensors", [req.user.APIKey, req.params.vehicleId])
    .then((data) => {
      res.status(200).json(data[0].getSensors).end();
    })
    .catch((error) => {
      res.status(500).send("Error!").end();
    });
});

//POST endpoints
const postSensorSchema = Joi.object({
  vehicleId: Joi.number().integer().required(),
  name: Joi.string().required(),
  outputUnit: Joi.optional(),
  category: Joi.string().required(),
  codeName: Joi.string().alphanum(),
  canId: Joi.string().alphanum(),
  frequency: Joi.number().integer(),
});

sensor.post("/postSensor", withAdminAuth, async (req, res) => {
  //Validate the request

  const checkParamsNotBody = 0;
  const result = await sanitizeInputs(
    req,
    res,
    apiKeySchema,
    postSensorSchema,
    checkParamsNotBody
  );
  if (result < 0) return;
  //Execute the stored procedure
  database
    .func("postSensor", [
      req.user.APIKey,
      req.body.vehicleId,
      req.body.name,
      req.body.outputUnit,
      req.body.category,
      req.body.codeName,
      req.body.canId,
      req.body.frequency,
    ])
    .then((data) => {
      res.status(200).json({ ID: data[0].rv }).end();
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({ err: "Error!" }).end();
    });
});

const putSensorSchema = Joi.object({
  name: Joi.string().required(),
  outputUnit: Joi.optional(),
  category: Joi.string().required(),
  codeName: Joi.string().alphanum(),
  canId: Joi.string().alphanum(),
  frequency: Joi.number().integer(),
});

sensor.put("/putSensor/:sensorid", withAdminAuth, async (req, res) => {
  //Validate the request
  const checkParamsNotBody = 0;
  const result = await sanitizeInputs(
    req,
    res,
    apiKeySchema,
    putSensorSchema,
    checkParamsNotBody
  );
  if (result < 0) return;
  //Execute the stored procedure
  database
    .proc("putSensor2", [
      req.params.sensorid,
      req.body.name,
      req.body.outputUnit,
      req.body.category,
      req.body.codeName,
      req.body.canId,
      req.body.frequency,
    ])
    .then((data) => {
      res.status(200).send({ msg: "Success!" }).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: "Error!" }).end();
    });
});

const sensorIDParams = Joi.object({
  sensorID: Joi.required(),
});

sensor.delete("/:sensorID", withAdminAuth, async (req, res) => {
  //Validate the request

  const sensorIDParamsCheck = sensorIDParams.validate(req.params);
  if (sensorIDParamsCheck.error) {
    console.log(sensorIDParamsCheck.error);
    res
      .status(400)
      .json({
        error: sensorIDParamsCheck.error.message,
      })
      .end();
    return;
  }
  console.log(req.params.sensorID)
  //Execute the stored procedure
  database
    .proc("deleteSensor", [parseInt(req.params.sensorID)])
    .then((data) => {
      res.status(200).send({ msg: "Success!" }).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: "Error!" }).end();
    });
});

module.exports = sensor;
