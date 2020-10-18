const Joi = require("@hapi/joi");

const PostVehicle = {
  body: Joi.object({
    name: Joi.string().max(50).required(),
  }),
};

const PutVehicle = {
  body: Joi.object({
    name: Joi.string().max(50).required(),
  }),
};

module.exports = {
  PostVehicle,
  PutVehicle,
};
