"use strict";

const express = require("express");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];
const logSchema = require("../Middleware/schema/logSchema");
const sanitizeInputs = require("../Middleware/helperFunctions");
const api = require("../Util/call");
const log = express.Router();

log.post("/", [withAdminAuth, sanitizeInputs(logSchema.LogPost.body)], async (req, res) => {
  const response = await api.call("log/", "POST", {
    searchParams: {
      APIKey: req.user.APIKey,
    },
    json: {
      utc: req.body.utc,
      value: req.body.value,
      raceId: req.body.raceId,
      sensorId: req.body.sensorId,
    },
  });
  res.status(response.status).json(response.body);
});

module.exports = log;
