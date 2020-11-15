"use strict";

const express = require("express");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];
const sensorSchema = require("../Middleware/schema/sensorSchema");
const api = require("../Utilities/call");
const sanitizeInputs = require("../Middleware/helperFunctions");
const sensor = express.Router();

sensor.get("/vehicle/:vehicleId", withAnyAuth, async (req, res) => {
  const response = await api.call(`sensor/vehicle/${req.params.vehicleId}`, "GET", {
    searchParams: {
      APIKey: req.user.APIKey,
    },
  });
  res.status(response.status).json(response.body).end();
});

sensor.post("/", [withAdminAuth, sanitizeInputs(sensorSchema.SensorPost.body)], async (req, res) => {
  //console.log(req.body);
  const response = await api.call(`sensor`, "POST", {
    json: {
      name: req.body.name,
      vehicleId: req.body.vehicleId,
      outputUnit: req.body.outputUnit,
      category: req.body.category,
      codeName: req.body.codeName,
      canId: req.body.canId,
      frequency: req.body.frequency,
    },
    searchParams: {
      APIKey: req.user.APIKey,
    },
  });
  res.status(response.status).json(response.body).end();
});

sensor.put("/:vehicleid/:sensorid", [withAdminAuth, sanitizeInputs(sensorSchema.SensorPut.body)], async (req, res) => {
  const response = await api.call(`sensor/${req.params.vehicleid}/${req.params.sensorid}`, "PUT", {
    searchParams: {
      APIKey: req.user.APIKey,
    },
    json: {
      name: req.body.name,
      outputUnit: req.body.outputUnit,
      category: req.body.category,
      codeName: req.body.codeName,
      canId: req.body.canId,
      frequency: req.body.frequency,
    },
  });
  res.status(response.status).json(response.body).end();
});

sensor.delete("/:sensorId", withAdminAuth, async (req, res) => {
  const response = await api.call(`sensor/${req.params.sensorId}`, "DELETE", {
    searchParams: {
      APIKey: req.user.APIKey,
    },
  });
  res.status(response.status).json(response.body).end();
});

module.exports = sensor;
