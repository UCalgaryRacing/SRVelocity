/**
 * Driver endpoint.
 *
 * Used to get all drivers, assign a driver to a vehicle, and add a new driver.
 **/
"use strict";

const database = require("../../Configuration/postgreSQL");
const express = require("express");
const withAnyAuth = require("../../Middleware/auth")[0];
const withAdminAuth = require("../../Middleware/auth")[1];
const Joi = require("@hapi/joi");
const apiKeySchema = require("../../Middleware/sanitizeAuth");
const sanitizeInputs = require("./helperFunctions");
const driver = express.Router();

driver.get("/getDrivers", withAnyAuth, async (req, res) => {
  //Validate the request
  const result = await sanitizeInputs(req, res, apiKeySchema);
  if (result < 0) return;
  //Execute the stored function
  database
    // .func("getDrivers", req.user.APIKey)
    .func("getDriversAndAssignedVehicles")
    .then((data) => {
      res.status(200).json(data[0].getDriversAndAssignedVehicles).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ err: "Error" }).end();
    });
});

// Sanitize driver input.
const assignDriverToVehicleSchema = Joi.object({
  driverId: Joi.number().integer().required(),
  vehicleId: Joi.number().integer().required(),
});

driver.post("/assignDriverToVehicle", withAdminAuth, async (req, res) => {
  //Validate the request
  const checkParamsNotBody = 0; // Data contained in req.body not req.params
  const result = await sanitizeInputs(req, res, apiKeySchema, assignDriverToVehicleSchema, checkParamsNotBody);
  if (result < 0) return;
  //Execute the stored procedure
  database
    .proc("assignDriverToVehicle", [req.user.APIKey, req.body.driverId, req.body.vehicleId])
    .then((data) => {
      res.status(200).send({ msg: "Success!" }).end();
    })
    .catch((error) => {
      res.status(500).send({ err: "Error!" }).end();
    });
});

// Sanitize driver input.
const postDriverSchema = Joi.object({
  firstName: Joi.string().alphanum().max(50).required(),
  lastName: Joi.string().alphanum().max(50).required(),
});

driver.post("/postDriver", withAdminAuth, async (req, res) => {
  //Validate the request
  const checkParamsNotBody = 0;
  const result = await sanitizeInputs(req, res, apiKeySchema, postDriverSchema, checkParamsNotBody);
  if (result < 0) return;
  //Execute the stored procedure
  database
    .func("postDriver", [req.user.APIKey, req.body.firstName, req.body.lastName])
    .then((data) => {
      res.status(200).send({ ID: data[0].rv }).end();
    })
    .catch((error) => {
      res.status(500).send({ error: "Error!" }).end();
    });
});

driver.put("/putDriver/:driverId", withAdminAuth, async (req, res) => {
  //Validate the request
  const checkParamsNotBody = 0;
  const result = await sanitizeInputs(req, res, apiKeySchema, postDriverSchema, checkParamsNotBody);
  if (result < 0) return;
  //Execute the stored procedure
  database
    .proc("putDriver", [req.params.driverId, req.body.firstName, req.body.lastName])
    .then((data) => {
      res.status(200).send({ msg: "Success!" }).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: "Error!" }).end();
    });
});

const deleteDriverSchema = Joi.object({});

driver.delete("/deleteDriver/:driverId", withAdminAuth, async (req, res) => {
  //Validate the request
  const checkParamsNotBody = 0;
  const result = await sanitizeInputs(req, res, apiKeySchema, deleteDriverSchema, checkParamsNotBody);
  if (result < 0) return;
  //Execute the stored procedure
  database
    .proc("deleteDriver", [req.params.driverId])
    .then((data) => {
      res.status(200).send({ msg: "Success!" }).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: "Error!" }).end();
    });
});

driver.delete("/unassigndriver/:drivesId", withAdminAuth, async (req, res) => {
  //Validate the request
  const checkParamsNotBody = 0;
  const result = await sanitizeInputs(req, res, apiKeySchema, Joi.object({}), checkParamsNotBody);
  if (result < 0) return;
  //Execute the stored procedure
  database
    .proc("deleteDrives", [req.params.drivesId])
    .then((data) => {
      res.status(200).send({ msg: "Success!" }).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: "Error!" }).end();
    });
});

module.exports = driver;
