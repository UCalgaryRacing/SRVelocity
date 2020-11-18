const express = require("express");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];
const subteamSchema = require("../Middleware/schema/subteamSchema");
const sanitizeInputs = require("../Middleware/helperFunctions");
const api = require("../Utilities/call");
const subteam = express.Router();

subteam.get("/", withAnyAuth, async (req, res) => {
  const response = await api.call("subteam/", "GET", {
    searchParams: {
      APIKey: req.user.APIKey,
    },
  });
  res.status(response.status).json(response.body);
});

subteam.get("/schulichvelocity", async (req, res) => {
  const response = await api.call("subteam/", "GET", {
    searchParams: {
      APIKey: "85e8133df46589ae24b8e6255790cfafbb6e7d732dff49ca8cf3687599db9cbc",
    },
  });
  res.status(response.status).json(response.body);
});

subteam.post("/", [withAdminAuth, sanitizeInputs(subteamSchema.SubteamSchemaPost.body)], async (req, res) => {
  const response = await api.call("subteam/", "POST", {
    searchParams: {
      APIKey: req.user.APIKey,
    },
    json: { name: req.body.name },
  });
  res.status(response.status).json(response.body);
});

module.exports = subteam;
