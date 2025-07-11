const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log de inicio de request
  logger.info(`→ ${req.method} ${req.path} - ${req.ip}`);
  
  // Log cuando la respuesta termina
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`← ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

module.exports = requestLogger;