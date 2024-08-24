const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //extract user info
      req.user = await User.findById(decoded.id).select("-password");

      //check for user
      if (!req.user) {
        if (process.env.NODE_ENV === "development") {
          console.error("User not found");
        }

        res.status(401);
        throw new Error("Not authorized");
      }

      next();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        if (error.name === "JsonWebTokenError") {
          console.error("Invalid token");
        } else if (error.name === "TokenExpiredError") {
          console.error("Expired token");
        } else {
          console.error("Authorization error:", error.message);
        }
      }

      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    if (process.env.NODE_ENV === "development") {
      console.error("No token");
    }

    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = {protect}