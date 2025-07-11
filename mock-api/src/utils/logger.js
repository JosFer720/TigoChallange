const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

const currentLevel = logLevels[process.env.LOG_LEVEL || 'info'];

const logger = {
  error: (message) => {
    if (currentLevel >= logLevels.error) {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    }
  },
  warn: (message) => {
    if (currentLevel >= logLevels.warn) {
      console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
    }
  },
  info: (message) => {
    if (currentLevel >= logLevels.info) {
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    }
  },
  debug: (message) => {
    if (currentLevel >= logLevels.debug) {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`);
    }
  }
};

module.exports = logger;