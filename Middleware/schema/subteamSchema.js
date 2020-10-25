"use strict";

const Joi = require("@hapi/joi");

const SubteamSchemaPost = {
  body: Joi.object({
    name: Joi.string().max(50).required(),
  }),
};

module.exports = {
  SubteamSchemaPost,
};
