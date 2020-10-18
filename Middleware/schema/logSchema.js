const Joi = require("@hapi/joi");

const LogPost = {
  body: Joi.object({
    utc: Joi.number().integer().required(),
    value: Joi.number().required(),
    raceId: Joi.number().integer().required(),
    sensorId: Joi.number().integer().required(),
  }),
};

module.exports = {
  LogPost,
};
