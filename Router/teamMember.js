"use strict";

const jwt = require("jsonwebtoken");
const express = require("express");
const teamMember = express.Router();
const api = require("../Utilities/call");
const bcrypt = require("bcryptjs");
const sanitizeInputs = require("../Middleware/helperFunctions");
const teamMemberSchema = require("../Middleware/schema/teamMemberSchema");
const withAnyAuth = require("../Middleware/auth")[0];
const withAdminAuth = require("../Middleware/auth")[1];

//Login
teamMember.post("/authenticate", sanitizeInputs(teamMemberSchema.TeamMemberAuthenticate.body), async (req, res) => {
  const user = await api.call(`teamMember/${req.body.email}/email`, "GET");
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
        }
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
    }
    else res.status(401).send({ error: "Password is incorrect!" }).end();
  }
  else res.status(user.status).json({ error: "Error status: " + user.status }).end();
});

//Get all team members
teamMember.get("/all", withAnyAuth, async (req, res) => {
  const users = await api.call(`teamMember/AllTeamMembers`, "GET", {
    searchParams: {
      APIKey: req.user.APIKey,
    }
  });
  if (users.status === 200) res.status(200).json(users.body).end();
  else res.status(users.status).json("Error status: " + users.status);
});

//Sign up
teamMember.post("/", sanitizeInputs(teamMemberSchema.TeamMemberSignUp), async (req, res) => {
  const response = await api.call(`teamMember/`, "POST", {
    json: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      subteamName: req.body.subteamName,
      teamName: "Schulich Racing",
    }
  });
  res.status(response.status).json(response.body).end();
});

teamMember.put("/:member/approve", withAdminAuth, async (req, res) => {
  const response = await api.call(`teammember/${req.params.member}/approve`, "PUT", {
    searchParams: { APIKey: req.user.APIKey }
  });
  res.status(response.status).json(res.body).end();
});

teamMember.put("/:memberID", [withAdminAuth, sanitizeInputs(teamMemberSchema.TeammemberPut)], async (req, res) => {
  response = await api.call(`teamMember/${req.params.memberID}`, "PUT", {
    json: {
      memberID: req.params.memberID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      subteamName: req.body.subteamName,
      isLead: req.body.isLead,
      isApproved: req.body.isApproved,
    }
  });
  res.status(reponse.status).json(reponse.body).end();
});

teamMember.delete("/:memberID", withAdminAuth, async (req, res) => {
  const response = await api.call(`teamMember/${req.params.memberID}`, "DELETE");
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
