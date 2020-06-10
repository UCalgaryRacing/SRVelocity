// Specify here how to sanitize the API key endpoint.
const Joi = require("@hapi/joi");

// Add any api key requirements here.
const apiKeySchema = Joi.object({
  APIKey: Joi.string()
    // Assume API key must be at least 16 characters.
    .min(16)
    .required(),
  memberId: Joi.optional()
});

module.exports = apiKeySchema;
