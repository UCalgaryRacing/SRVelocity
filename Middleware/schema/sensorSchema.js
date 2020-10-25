"use strict";

const Joi = require("@hapi/joi");

const SensorPost = {
  body: Joi.object({
    vehicleId: Joi.number().integer().required(),
    name: Joi.string().required(),
    outputUnit: Joi.optional(),
    category: Joi.string().required(),
    codeName: Joi.string().alphanum(),
    canId: Joi.string().alphanum(),
    frequency: Joi.number().integer(),
  })
};

const SensorPut = {
  body: Joi.object({
    name: Joi.string().required(),
    outputUnit: Joi.optional(),
    category: Joi.string().required(),
    codeName: Joi.string().alphanum(),
    canId: Joi.string().alphanum(),
    frequency: Joi.number().integer(),
  })
};

module.exports = {
  SensorPost,
  SensorPut
};
