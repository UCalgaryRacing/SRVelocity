const express = require("express");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];
const Joi = require("@hapi/joi");
const sensorSchema = require("../Middleware/schema/sensorSchema");
const api = require("../Util/call");
const sanitizeInputs = require("../Middleware/helperFunctions");
const sensor = express.Router();

sensor.get("/vehicle/:vehicleId", withAnyAuth, async (req, res) => {
  const response = await api.call(`sensor/vehicle/${req.params.vehicleId}`, "GET", {
    searchParams: {
      APIKey: req.user.APIKey,
    },
  });
  res.status(response.status).json(response.body);
});

sensor.post("/", [withAdminAuth, sanitizeInputs(sensorSchema.SensorPost.body)], async (req, res) => {
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
  });
  res.status(response.status).json(response.body);
});

sensor.put("/:sensorId", [withAdminAuth, sanitizeInputs(sensorSchema.SensorPut.body)], async (req, res) => {
  const response = await api.call(`sensor/${req.params.sensorId}`, "PUT", {
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

  res.status(response.status).json(response.body);
});

sensor.delete("/:sensorId", withAdminAuth, async (req, res) => {
  const response = await api.call(`sensor/${req.params.sensorId}`, "DELETE", {
    searchParams: {
      APIKey: req.user.APIKey,
    },
  });

  res.status(response.status).json(response.body);
});

module.exports = sensor;
