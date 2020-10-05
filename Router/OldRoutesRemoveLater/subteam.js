/**
 * Subteam endpoint.
 *
 * Used to retrieve subteams, and add a subteam.
 **/
"use strict";

const database = require("../Configuration/postgreSQL");
const express = require("express");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];
const Joi = require("@hapi/joi");
const apiKeySchema = require("../Middleware/sanitizeAuth");
const sanitizeInputs = require("./helperFunctions");
const subteam = express.Router();

subteam.get("/getSubteams", withAnyAuth, async (req, res) => {
	//Validate the request
	const result = await sanitizeInputs(req, res, apiKeySchema);
	if (result < 0) return;
	//Execute the stored function
	database.func("getSubteams", [req.user.APIKey])
		.then(data => {
			res.status(200).json(data[0].getSubteams).end();
		})
		.catch(error => {
			res.status(500).send("Error!").end();
		});
});

// Sanitize input.
const postSubteamSchema = Joi.object({
	name: Joi.string().required()
});

subteam.post("/postSubteam", withAdminAuth, async (req, res) => {
	// Validate the request
	const checkParamsNotBody = 0;
	const result = await sanitizeInputs(req, res, apiKeySchema, postSubteamSchema, checkParamsNotBody);
	if (result < 0) return;
	//Execute the stored procedure
	database.proc("postSubteam", [req.user.APIKey, req.body.name])
		.then(data => {
			res.status(200).send("Success!").end();
		})
		.catch(error => {
			res.status(500).send("Error!").end();
		});
});

module.exports = subteam;
