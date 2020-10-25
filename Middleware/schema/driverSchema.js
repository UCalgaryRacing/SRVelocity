"use strict";

const Joi = require("@hapi/joi");

const DriverPost = {
  body: {
    firstName: Joi.string().alphanum().max(50).required(),
    lastName: Joi.string().alphanum().max(50).required(),
  }
};

const DriverPut = {
  body: {
    firstName: Joi.string().alphanum().max(50).required(),
    lastName: Joi.string().alphanum().max(50).required(),
  }
};

module.exports = {
  DriverPost,
  DriverPut
};
