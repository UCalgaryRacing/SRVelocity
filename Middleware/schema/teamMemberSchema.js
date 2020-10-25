"use strict";

const Joi = require("@hapi/joi");

const TeamMemberAuthenticate = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
};

const TeamMemberSignUp = {
  body: Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().alphanum().max(50).required(),
    lastName: Joi.string().alphanum().max(50).required(),
    subteamName: Joi.string().max(50).required(),
  })
};

const TeamMemberPut = {
  body: Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().alphanum().max(50).required(),
    lastName: Joi.string().alphanum().max(50).required(),
    subteamName: Joi.string().max(50).required(),
    isLead: Joi.boolean().required(),
    isApproved: Joi.boolean().required(),
  }),
  params: Joi.object({
    memberID: Joi.required(),
  })
};

module.exports = {
  TeamMemberAuthenticate,
  TeamMemberSignUp,
  TeamMemberPut
};
