// logger.js
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString(); // get current time
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
   next()// move to next middleware or route
};

module.exports = logger;