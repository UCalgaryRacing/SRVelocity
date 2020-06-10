/**
 * Logs endpoint.
 *
 * Used to add a log, which is periodically emited from car while it is moving.
 **/
"use strict";

const database = require("../Configuration/postgreSQL");
const express = require("express");
const withAdminAuth = require("../Middleware/auth")[1];
const Joi = require("@hapi/joi");
const apiKeySchema = require("../Middleware/sanitizeAuth");
const sanitizeInputs = require("./helperFunctions");
const log = express.Router();

// Sanitize log input.
const postLogSchema = Joi.object({
	utc: Joi.number().integer().required(),
	value: Joi.number().required(),
	raceId: Joi.number().integer().required(),
	sensorId: Joi.number().integer().required()
});

// Post a new log entry in the database
// Posts time, values, specific race ID, and sensor sensor ID to table 
log.post("/postLog", withAdminAuth, async (req, res) => {
	//Validate the request
	const checkParamsNotBody = 0;
	const result = await sanitizeInputs(req, res, apiKeySchema, postLogSchema, checkParamsNotBody);
	if (result < 0) return;
	//Execute the stored procedure
	database.proc("postLog", [
			req.user.APIKey,
			req.body.utc,
			req.body.value,
			req.body.raceId,
			req.body.sensorId
		])
		.then(data => {
			console.log(data)
			res.status(200).send("Success!").end();
		})
		.catch(error => {
			console.log(error)
			res.status(500).send("Error!").end();
		});
});

module.exports = log;
