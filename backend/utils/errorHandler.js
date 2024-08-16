// utils/errorHandler.js
const handleValidationError = (error, res, defaultMessage = "Validation failed") => {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ message: messages.join(", ") });
    } else {
      res.status(400).json({ message: error.message || defaultMessage });
    }
  };
  
  module.exports = handleValidationError;
  