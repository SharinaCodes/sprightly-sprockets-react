/**
 * Provides error handling for the application
 * @param {*} err error object
 * @param {*} req request object
 * @param {*} res response object
 * @param {*} next next function
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
