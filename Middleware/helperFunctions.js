/**
 * Sanitize inputs. Takes in the req and res objects, along with a Joi blueprint
 * that specifies the required schema of the reqest.
 * Since the API Key is held in req.user by design, this is what is checked
 * for sanitizing the API Key.
 * The default place where the other input data is held is in req.body.
 * However, it can be overwritten to check req.params by setting checkParams to
 * 1.
 *
 * @param {Object} req Express req
 * @param {Object} res Express res
 * @param {Joi} apiKeySchema Joi object containing API schema for sanitization.
 * @param {Joi} reqSchema Joi object containing API schema for sanitization.
 * @param {Integer} checkParamsNotBody If 1 we check req.params, otherwise we check req.body.
 *
 **/
// const sanitizeInputs = async function (
//   req,
//   res,
//   apiKeySchema,
//   reqSchema,
//   checkParamsNotBody
// ) {
//   const apiKeyCheck = apiKeySchema.validate(req.user);
//   if (apiKeyCheck.error) {
//     res.status(400).json({ error: apiKeyCheck.error.message }).end();
//     return -1;
//   }

//   if (reqSchema) {
//     let reqSchemaCheck;
//     if (checkParamsNotBody === 1) {
//       reqSchemaCheck = reqSchema.validate(req.params);
//     } else {
//       reqSchemaCheck = reqSchema.validate(req.body);
//     }

//     if (reqSchemaCheck.error) {
//       res.status(400).json({ error: reqSchemaCheck.error.message }).end();
//       return -1;
//     }
//   }
//   return 0;
// };

const sanitizeInputs = function (reqSchemaBody, reqSchemaParams) {
  return async (req, res, next) => {
    if (reqSchemaBody) {
      const reqCheck = reqSchemaBody.validate(req.body);
      if (reqCheck.error) {
        res.status(400).json({ error: reqCheck.error.message });
        return;
      }
    }
    if (reqSchemaParams) {
      const reqCheck = reqSchemaParams.validate(req.params);
      if (reqCheck.error) {
        res.status(400).json({ error: reqCheck.error.message });
        return;
      }
    }
    next();
  };
};

module.exports = sanitizeInputs;
