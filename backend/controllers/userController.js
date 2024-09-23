const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/**
 * Registers a new user.
 * This function handles the registration process, including validating the input, 
 * checking for an existing user, hashing the password, and creating the user in the database.
 * Route: POST /api/users
 * Access: Public
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON object with the new user details and a JWT token.
 * @throws {Error} - Throws an error if required fields are missing or the user already exists.
 */
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //validation
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //search for existing user
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //Create new user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Unable to register user");
  }
});

/**
 * Logs in a user.
 * This function checks if the user exists and if the password is correct, 
 * then returns a JWT token for authentication.
 * Route: POST /api/users/login
 * Access: Public
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON object with the user's details and a JWT token.
 * @throws {Error} - Throws an error if the credentials are invalid.
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //ensure all data is sent
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });

  //check for user existence and password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

/**
 * Retrieves the current user's profile.
 * This function returns the authenticated user's details (without the password).
 * Route: GET /api/users/profile
 * Access: Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON object with the current user's details.
 */
const getProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  res.status(200).json({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
});

/**
 * Generates a JWT token for a user.
 * This helper function creates a token that expires in 30 days.
 * @param {string} userId - The user's ID.
 * @returns {string} - The generated JWT token.
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
