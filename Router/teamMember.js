"use strict";

const jwt = require("jsonwebtoken");
const express = require("express");
const teamMember = express.Router();
const Joi = require("@hapi/joi");
const api = require("../Util/call");
const { options } = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const sanitizeInputs = require("../Util/helperFunctions");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];

const authenticateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

//Login
teamMember.post("/authenticate", async (req, res) => {
  const authenticateSchemaCheck = authenticateSchema.validate(req.body);
  if (authenticateSchemaCheck.error) {
    res.status(400).json({ error: authenticateSchemaCheck.error.message }).end();
    return;
  }

  const user = await api.call(`teammember/${req.body.email}/email`, "GET");
  if (user.status === 200) {
    const isMatch = await bcrypt.compare(req.body.password, user.body.password);
    if (isMatch) {
      const payload = {
        user: {
          email: user.body.email,
          firstName: user.body.first_name,
          lastName: user.body.last_name,
          teamID: user.body.team_id,
          subteam: user.body.subteam_name,
          id: user.body.member_id,
          isLead: user.body.is_lead,
          APIKey: user.body.api_key,
        },
      };
      jwt.sign(payload, "VerBigSuperScarySecret", { expiresIn: "30m" }, (err, token) => {
        if (err) res.status(500).send("Error!").end();
        res.cookie("token", token, { httpOnly: true });
        res
          .status(200)
          .json({
            firstName: user.body.first_name,
            lastName: user.body.last_name,
            email: user.body.email,
            teamID: user.body.team_id,
            subteam: user.body.subteam_name,
            ID: user.body.member_id,
          })
          .end();
      });
    } else res.status(401).send({ error: "Password is incorrect!" }).end();
  } else {
    res.status(user.status).json({ error: "Error status: " + user.status });
  }
});

//Get all team members
teamMember.get("/all", withAnyAuth, async (req, res) => {
  const users = await api.call(`teammember/AllTeamMembers`, "GET", {
    searchParams: {
      APIKey: req.user.APIKey,
    },
  });
  if (users.status === 200) res.status(200).json(users.body).end();
  else {
    res.status(users.status).json("Error status: " + users.status);
  }
});

const postTeamMemberSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  firstName: Joi.string().alphanum().max(50).required(),
  lastName: Joi.string().alphanum().max(50).required(),
  subteamName: Joi.string().max(50).required(),
});

const defaultTeamName = "Schulich Racing";

//Sign up
teamMember.post("/", async (req, res) => {
  //Validate the request
  const postTeamMemberSchemaCheck = postTeamMemberSchema.validate(req.body);
  if (postTeamMemberSchemaCheck.error) {
    res.status(400).json({ error: postTeamMemberSchemaCheck.error.details[0].message }).end();
    return;
  }
  const response = await api.call(`teammember/`, "POST", {
    json: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      subteamName: req.body.subteamName,
    },
  });
  res.status(response.status).json(response.body).end();
});

teamMember.put("/:member/approve", withAdminAuth, async (req, res) => {
  const response = await api.call(`teammember/${req.params.member}/approve`, "PUT", {
    searchParams: { APIKey: req.user.APIKey },
  });
  res.status(response.status).json(res.body).end();
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
        error: putTeamMemberSchemaCheck.error || putTeamMemberIDSchemaCheck.error,
      })
      .end();
    return;
  }
  response = await api.call(`teammember/${req.params.memberID}`, "PUT", {
    json: {
      memberID: req.params.memberID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      subteamName: req.body.subteamName,
      isLead: req.body.isLead,
      isApproved: req.body.isApproved,
    },
  });
  res.status(reponse.status).json(reponse.body).end();
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

  const response = await api.call(`teammember/${req.params.memberID}`, "DELETE");
  res.status(response.status).json(response.body).end();
});

teamMember.get("/checkToken", withAnyAuth, (req, res) => {
  res.sendStatus(200).end();
});

teamMember.get("/logout", withAnyAuth, (req, res) => {
  const payload = {};
  const token = jwt.sign(payload, "x", { expiresIn: "1" });
  res.cookie("token", token, { httpOnly: true });
  res.status(200).send({ msg: "Success!" }).end();
});

module.exports = teamMember;
