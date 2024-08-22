const asyncHandler = require("express-async-handler");
const Part = require("../models/partModel");
const Product = require("../models/productModel");

// @desc    Get Low Stock Report
// @route   GET /api/reports/low-stock
// @access  Private
const getLowStockReport = asyncHandler(async (req, res) => {
    // Define "low stock" as stock that is less than or equal to min * 1.1 (10% above min)
    const lowStockThreshold = { $expr: { $lte: ["$stock", { $multiply: ["$min", 1.1] }] } };
  
    const lowStockParts = await Part.find(lowStockThreshold);

    const lowStockProducts = await Product.find(lowStockThreshold);
  
    res.status(200).json({lowStockParts, lowStockProducts});
  });
  

// @desc    Get Parts by Type Report
// @route   GET /api/reports/parts-by-type
// @access  Private
const getPartsByTypeReport = asyncHandler(async (req, res) => {
  const inHouseParts = await Part.find({ type: "InHouse" });
  const outsourcedParts = await Part.find({ type: "Outsourced" });

  res.status(200).json({ inHouseParts, outsourcedParts });
});

// @desc    Get Product Parts Association Report
// @route   GET /api/reports/product-parts-association
// @access  Private
const getProductPartsAssociationReport = asyncHandler(async (req, res) => {
  const products = await Product.find().populate('associatedParts.partId');

  res.status(200).json(products);
});

module.exports = {
  getLowStockReport,
  getPartsByTypeReport,
  getProductPartsAssociationReport,
};
