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
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Validate token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Extract user
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
      res.status(401);
      throw new Error("Not authorized");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
