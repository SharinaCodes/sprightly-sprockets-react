const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Product = require("../models/productModel");
const handleValidationError = require("../utils/errorHandler");

// @desc    Create a product
// @route   POST /api/products
// @access  Private
const addProduct = asyncHandler(async (req, res) => {
  const { name, price, stock, min, max, associatedParts } = req.body;

  try {
    const product = new Product({
      name,
      price,
      stock,
      min,
      max,
      associatedParts,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    handleValidationError(error, res, "Unable to add new product.");
  }
});

// @desc    Get all products
// @route   GET /api/products
// @access  Private
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate('associatedParts.partId');
  res.status(200).json(products);
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Private
const lookupProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid ID format");
    }

    const product = await Product.findById(id).populate('associatedParts.partId');

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message || "Product not found" });
  }
});

// @desc    Get products by name (partial, case-insensitive)
// @route   GET /api/products/name/:name
// @access  Private
const lookupProductByName = asyncHandler(async (req, res) => {
  const { name } = req.params;

  try {
    // Use a regular expression for partial, case-insensitive matching
    const products = await Product.find({ name: new RegExp(name, "i") }).populate('associatedParts.partId');

    if (products.length === 0) {
      res.status(404);
      throw new Error("No products found");
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message || "Error occurred during the search" });
  }
});

// @desc    Update a product by ID
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const { name, price, stock, min, max, associatedParts } = req.body;

  try {
    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400);
      throw new Error("Invalid ID format");
    }

    const product = await Product.findById(productId);
    if (product) {
      product.name = name;
      product.price = price;
      product.stock = stock;
      product.min = min;
      product.max = max;
      product.associatedParts = associatedParts;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    handleValidationError(error, res, "Unable to update product.");
  }
});

// @desc    Delete a product by ID
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  try {
    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400);
      throw new Error("Invalid ID format");
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    if (product) {
      // Delete the product
      await product.deleteOne();
      res.status(200).json({ message: "Product removed" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message || "An error occurred while attempting to delete the product.",
    });
  }
});

module.exports = {
  addProduct,
  getAllProducts,
  lookupProductById,
  lookupProductByName,
  updateProduct,
  deleteProduct,
};
