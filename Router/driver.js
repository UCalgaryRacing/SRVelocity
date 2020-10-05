"use strict";
const database = require("../Configuration/postgreSQL");
const express = require("express");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];
const Joi = require("@hapi/joi");
const apiKeySchema = require("../Middleware/sanitizeAuth");
const sanitizeInputs = require("./helperFunctions");
const api = require("../Util/call");
const driver = express.Router();

driver.get("/", withAnyAuth, async (req, res) => {
  const response = await api.call("driver/", "GET");
  res.status(response.status).json(response.body).end();
});

driver.put("/:driver/vehicle/:vehicle", withAdminAuth, async (req, res) => {
  const response = await api.call(`driver/${req.params.driver}/vehicle/${req.params.vehicle}`, "PUT", {
    searchParams: {
      APIKey: req.user.APIKey,
    },
  });

  res.status(response.status).json(response.body).end();
});

driver.post("/", withAdminAuth, async (req, res) => {
  const response = await api.call(`driver`, "POST", {
    json: { firstName: req.body.firstName, lastName: req.body.lastName },
  });

  res.status(response.status).json(response.body).end();
});

driver.put("/:driverId", withAdminAuth, async (req, res) => {
  const response = await api.call(`driver/${req.params.driverId}`, "PUT", {
    json: { firstName: req.body.firstName, lastName: req.body.lastName },
  });

  res.status(response.status).json(response.body).end();
});

driver.delete("/:driverId", withAdminAuth, async (req, res) => {
  const response = await api.call(`driver/${req.params.driverId}`, "DELETE", {});

  res.status(response.status).json(response.body).end();
});

driver.delete("/vehicle/:drivesId", withAdminAuth, async (req, res) => {
  const response = await api.call(`driver/${drivers}`, "DELETE");

  res.status(response.status).json(response.body).end();
});
