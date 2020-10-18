const express = require("express");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];
const subteamSchema = require("../Middleware/schema/subteamSchema");
const sanitizeInputs = require("../Middleware/helperFunctions");
const api = require("../Util/call");
const subteam = express.Router();

subteam.get("/", withAnyAuth, async (req, res) => {
  const response = await api.call("subteam/", "GET", {
    searchParams: {
      APIKey: req.user.APIKey,
    },
  });
  res.status(response.status).json(response.body);
});

subteam.post("/", [withAdminAuth, sanitizeInputs(subteamSchema.SubteamSchemaPost.body)], async (req, res) => {
  const response = await api.call("subteam/", "POST", {
    searchParams: {
      APIKey: req.user.APIKey,
    },
    json: {
      name: req.body.name,
    },
  });
  res.status(response.status).json(response.body);
});

module.exports = subteam;
