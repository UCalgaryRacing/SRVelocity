"use strict";

const express = require("express");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];
const vehicleSchema = require("../Middleware/schema/vehicleSchema");
const sanitizeInputs = require("../Middleware/helperFunctions");
const api = require("../Utilities/call");
const vehicle = express.Router();

vehicle.get("/", withAnyAuth, async (req, res) => {
  const response = await api.call("vehicle/", "GET", {
    searchParams: {
      APIKey: req.user.APIKey
    }
  });
  res.status(response.status).json(response.body);
});

vehicle.post("/", [withAdminAuth, sanitizeInputs(vehicleSchema.PostVehicle.body)], async (req, res) => {
  const response = await api.call("vehicle/", "POST", {
    searchParams: {
      APIKey: req.user.APIKey
    },
    json: { name: req.body.name }
  });
  res.status(response.status).json(response.body);
});

vehicle.put("/:vehicleId", [withAdminAuth, sanitizeInputs(vehicleSchema.PutVehicle.body)], async (req, res) => {
  const response = await api.call(`vehicle/${req.params.vehicleId}`, "PUT", {
    searchParams: {
      APIKey: req.user.APIKey
    },
    json: { name: req.body.name }
  });
  res.status(response.status).json(response.body);
});

vehicle.delete("/:vehicleId", withAdminAuth, async (req, res) => {
  const response = await api.call(`vehicle/${req.params.vehicleId}`, "DELETE", {
    searchParams: {
      APIKey: req.user.APIKey
    }
  });
  res.status(response.status).json(response.body);
});

module.exports = vehicle;
