const Joi = require('joi');

const responseSchema = Joi.object({
  status: Joi.number().integer().min(100).max(599).default(200),
  headers: Joi.object().pattern(Joi.string(), Joi.string()).default({}),
  body: Joi.any().default({}),
  delay: Joi.number().integer().min(0).max(30000).default(0)
});

const rulesSchema = Joi.object({
  query: Joi.object().pattern(Joi.string(), Joi.any()).default({}),
  headers: Joi.object().pattern(Joi.string(), Joi.string()).default({}),
  body: Joi.object().pattern(Joi.string(), Joi.any()).default({}),
  params: Joi.object().pattern(Joi.string(), Joi.any()).default({})
});

const configSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  description: Joi.string().allow('').max(500),
  path: Joi.string().required().pattern(/^\//).message('Path must start with /'),
  method: Joi.string().required().valid('GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'),
  response: responseSchema.required(),
  rules: rulesSchema,
  priority: Joi.number().integer().min(0).max(100).default(0),
  enabled: Joi.boolean().default(true)
});

const updateConfigSchema = configSchema.fork(
  ['name', 'path', 'method', 'response'],
  (schema) => schema.optional()
);

const validateConfig = (req, res, next) => {
  const { error, value } = configSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors
    });
  }
  req.body = value;
  next();
};

const validateUpdateConfig = (req, res, next) => {
  const { error, value } = updateConfigSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors
    });
  }
  req.body = value;
  next();
};

module.exports = {
  validateConfig,
  validateUpdateConfig
};