"use strict";

const express = require("express");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];
const sanitizeInputs = require("../Middleware/helperFunctions");
const driverSchema = require("../Middleware/schema/driverSchema");
const api = require("../Utilities/call");
const driver = express.Router();

driver.get("/", withAnyAuth, async (req, res) => {
	const response = await api.call("driver/", "GET", {
		searchParams: {
			APIKey: req.user.APIKey,
		}
	});
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

driver.post("/", [withAdminAuth, sanitizeInputs(driverSchema.DriverPost.body)], async (req, res) => {
	const response = await api.call(`driver`, "POST", {
		searchParams: {
			APIKey: req.user.APIKey,
		},
		json: { firstName: req.body.firstName, lastName: req.body.lastName },
	});
	res.status(response.status).json(response.body).end();
});

driver.put("/:driverId", [withAdminAuth, sanitizeInputs(driverSchema.DriverPut.body)], async (req, res) => {
	const response = await api.call(`driver/${req.params.driverId}`, "PUT", {
		searchParams: {
			APIKey: req.user.APIKey,
		},
		json: { firstName: req.body.firstName, lastName: req.body.lastName },
	});
	res.status(response.status).json(response.body).end();
});

driver.delete("/:driverId", withAdminAuth, async (req, res) => {
	const response = await api.call(`driver/${req.params.driverId}`, "DELETE", {
		searchParams: {
			APIKey: req.user.APIKey,
		},
	});
	res.status(response.status).json(response.body).end();
});

driver.delete("/vehicle/:drivesId", withAdminAuth, async (req, res) => {
	const response = await api.call(`driver/${drivers}`, "DELETE", {
		searchParams: {
			APIKey: req.user.APIKey,
		},
	});
	res.status(response.status).json(response.body).end();
});

module.exports = driver;
