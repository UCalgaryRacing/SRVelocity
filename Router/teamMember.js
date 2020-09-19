"use strict";

const database = require("../Configuration/postgreSQL");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];
const Joi = require("@hapi/joi");
const apiKeySchema = require("../Middleware/sanitizeAuth");
const sanitizeInputs = require("./helperFunctions");
const teamMember = express.Router();

//GET endpoints
const authenticateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

teamMember.post("/authenticate", async (req, res) => {
  //Validate the request
  const authenticateSchemaCheck = authenticateSchema.validate(req.body);
  if (authenticateSchemaCheck.error) {
    res
      .status(400)
      .json({ error: authenticateSchemaCheck.error.message })
      .end();
    return;
  }
  //Execute the stored function
  database
    .func("getTeamMember", req.body.email)
    .then(async (data) => {
      if (data.length === 0) {
        res.status(404).send("User not found!").end();
      } else {
        data = data[0].getTeamMember;
        if (data.is_approved === false)
          res.status(401).send({ error: "Auth Failed!" }).end();
        const isMatch = await bcrypt.compare(req.body.password, data.password);
        if (isMatch) {
          const payload = {
            user: {
              APIKey: data.api_key,
              memberId: data.member_id,
            },
          };
          jwt.sign(
            payload,
            data.is_lead ? "AdminSecret" : "NonAdminSecret",
            { expiresIn: "30m" },
            (err, token) => {
              if (err) res.status(500).send("Error!").end();
              res.cookie("token", token, { httpOnly: true });
              res
                .status(200)
                .json({
                  firstName: data.first_name,
                  lastName: data.last_name,
                  email: data.email,
                  subteam: data.subteam_name,
                  ID: data.member_id,
                })
                .end();
            }
          );
        } else res.status(400).send({ error: "Password is incorrect!" }).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: "Error!" }).end();
    });
});

teamMember.get("/getAllTeamMembers", withAnyAuth, async (req, res) => {
  //Validate the request
  const result = await sanitizeInputs(req, res, apiKeySchema);
  if (result < 0) return;
  //Execute the stored function
  database
    .func("getAllTeamMembers", req.user.APIKey)
    .then((data) => {
      res.status(200).json(data[0].getAllTeamMembers).end();
    })
    .catch((error) => {
      res.status(500).send("Error!").end();
    });
});

//POST endpoints
const postTeamMemberSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  firstName: Joi.string().alphanum().max(50).required(),
  lastName: Joi.string().alphanum().max(50).required(),
  subteamName: Joi.string().max(50).required(),
  //isLead: Joi.boolean(),
  //teamName: Joi.string(),
});

const defaultTeamName = "Schulich Racing";

//Sign up
teamMember.post("/", async (req, res) => {
  //Validate the request
  const postTeamMemberSchemaCheck = postTeamMemberSchema.validate(req.body);
  if (postTeamMemberSchemaCheck.error) {
    res
      .status(400)
      .json({ error: postTeamMemberSchemaCheck.error.details[0].message })
      .end();
    console.log(postTeamMemberSchemaCheck.error);
    return;
  }
  //Encrypt the password
  const salt = await bcrypt.genSalt(10);
  console.log(req.body.password);
  const password = await bcrypt.hash(req.body.password, salt);
  //Execute the stored procedure
  database
    .proc("postTeamMember", [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      password,
      req.body.subteamName,
      false,
      defaultTeamName,
    ])
    .then((data) => {
      res.status(200).send({ msg: "Success!" }).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: "Error" }).end();
    });
});

const approveTeamMemberSchema = Joi.object({
  memberId: Joi.number().integer().required(),
});
//PUT endpoints
teamMember.put("/approveTeamMember", withAdminAuth, async (req, res) => {
  //Validate the request
  const approveTeamMemberSchemaCheck = approveTeamMemberSchema.validate(
    req.body
  );
  if (approveTeamMemberSchemaCheck.error) {
    res.status(400).json({ error: approveTeamMemberSchemaCheck.error }).end();
    return;
  }
  //Execute the stored procedure
  database
    .proc("approveTeamMember", [req.user.APIKey, req.body.memberId])
    .then((data) => {
      res.status(200).send("Success!").end();
    })
    .catch((error) => {
      res.status(500).send("Error!").end();
    });
});

const putTeamMemberSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().alphanum().max(50).required(),
  lastName: Joi.string().alphanum().max(50).required(),
  subteamName: Joi.string().max(50).required(),
  isLead: Joi.boolean().required(),
  isApproved: Joi.boolean().required(),
});

const putTeamMemberSchemaID = Joi.object({
  memberID: Joi.required(),
});

teamMember.put("/:memberID", withAdminAuth, async (req, res) => {
  //Validate the request
  const putTeamMemberSchemaCheck = putTeamMemberSchema.validate(req.body);
  const putTeamMemberIDSchemaCheck = putTeamMemberSchemaID.validate(req.params);
  if (putTeamMemberSchemaCheck.error || putTeamMemberIDSchemaCheck.error) {
    res
      .status(400)
      .json({
        error:
          putTeamMemberSchemaCheck.error || putTeamMemberIDSchemaCheck.error,
      })
      .end();
    return;
  }

  //Execute the stored procedure
  database
    .proc("putTeamMember", [
      req.params.memberID,
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.subteamName,
      req.body.isLead,
      req.body.isApproved,
    ])
    .then((data) => {
      res.status(200).send({ msg: "Success!" }).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: "Error!" }).end();
    });
});

teamMember.delete("/:memberID", withAdminAuth, async (req, res) => {
  //Validate the request

  const putTeamMemberIDSchemaCheck = putTeamMemberSchemaID.validate(req.params);
  if (putTeamMemberIDSchemaCheck.error) {
    res
      .status(400)
      .json({
        error: putTeamMemberIDSchemaCheck.error.message,
      })
      .end();
    return;
  }

  //Execute the stored procedure
  database
    .proc("deleteTeamMember", [parseInt(req.params.memberID)])
    .then((data) => {
      res.status(200).send({ msg: "Success!" }).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: "Error!" }).end();
    });
});

teamMember.get("/checkToken", withAnyAuth, (req, res) => {
  res.sendStatus(200).end();
});

teamMember.get("/stopSession", withAnyAuth, (req, res) => {
  const payload = {};
  const token = jwt.sign(payload, "x", { expiresIn: "1" });
  res.cookie("token", token, { httpOnly: true });
  res.status(200).send({ msg: "Success!" }).end();
});

module.exports = teamMember;
