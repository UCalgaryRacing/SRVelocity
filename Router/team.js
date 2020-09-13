/**
 * Team endpoint.
 *
 * Used to get all teams, get a specific team, and add a team.
 **/
"use strict";

const database = require("../Configuration/postgreSQL");
const express = require("express");
const uuidAPIKey = require("uuid-apikey");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];
const Joi = require("@hapi/joi");
const apiKeySchema = require("../Middleware/sanitizeAuth");
const sanitizeInputs = require("./helperFunctions");
const encrypt = require('../Middleware/encrypt');
const decrypt = require('../Middleware/decrypt');
const team = express.Router();

team.get("/getAllTeams", withAnyAuth, async (req, res) => {
	//Validate the request
	const result = await sanitizeInputs(req, res, apiKeySchema);
	if (result < 0) return;
	//Execute the stored function
	database.func("getAllTeams", req.user.APIKey)
		.then(data => {
			res.status(200).json(data[0].getAllTeams).end();
		})
		.catch(error => {
			res.status(500).send("Error!").end();
		});
});

team.get("/getTeam", withAnyAuth, async (req, res) => {
	//Validate the request
	const result = await sanitizeInputs(req, res, apiKeySchema);
	if (result < 0) return;
	//Execute the stored function
	database.func("getTeam", req.user.APIKey)
		.then(data => {
			res.status(200).json(data[0].getTeam).end();
		})
		.catch(error => {
			res.status(500).send("Error!").end();
		});
});

team.get("/getAPIKey", withAdminAuth, async (req, res) => {
	let key = decrypt(req.user.APIKey);
	res.status(200).send(key).end();
});

// Sanitize input.
const postTeamSchema = Joi.object({
	name: Joi.string().max(50).required(),
	university: Joi.string().max(50).required()
});

team.post("/postTeam", async (req, res) => {
	//Validate the request
	const postTeamSchemaCheck = postTeamSchema.validate(req.body);
	if (postTeamSchemaCheck.error) {
		console.error("Error: One of inputs in body did not meet input requirements.");
		res.status(400).json({ error: postTeamSchemaCheck.error }).end();
		return;
	}
	// Execute the stored procedure
	const apiKey = encrypt(uuidAPIKey.create().apiKey);
	database.proc("postTeam", [req.body.name, req.body.university, apiKey])
		.then(data => {
			res.status(200).send('Success!').end();
		})
		.catch(error => {
			res.status(500).send("Error!").end();
		});
});

module.exports = team;
