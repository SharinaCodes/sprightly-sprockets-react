const asyncHandler = require("express-async-handler");
const Part = require("../models/partModel");
const Product = require("../models/productModel");
const User = require ('../models/userModel');

// @desc    Get Parts Creation/Modification Report
// @route   GET /api/reports/parts-timestamps
// @access  Private
const getPartsTimestampReport = asyncHandler(async (req, res) => {
  const parts = await Part.find().select('name createdAt updatedAt');

  res.status(200).json({
    title: "Parts Creation/Modification Report",
    date: new Date(),
    parts,
  });
});


// @desc    Get Products Creation/Modification Report
// @route   GET /api/reports/products-timestamps
// @access  Private
const getProductsTimestampReport = asyncHandler(async (req, res) => {
  const products = await Product.find().select('name createdAt updatedAt');

  res.status(200).json({
    title: "Products Creation/Modification Report",
    date: new Date(),
    products,
  });
});  

// @desc    Get Users Creation/Modification Report
// @route   GET /api/reports/users-timestamps
// @access  Private
const getUsersTimestampReport = asyncHandler(async (req, res) => {
  const users = await User.find().select('firstName lastName email createdAt updatedAt');

  res.status(200).json({
    title: "Users Creation/Modification Report",
    date: new Date(),
    users,
  });
});

module.exports = {
  getPartsTimestampReport,
  getProductsTimestampReport,
  getUsersTimestampReport,
};
