const Inventory = require("./Inventory");
const Product = require("../models/productModel");
const mongoose = require('mongoose');
const asyncHandler = require("express-async-handler");

/**
 * ProductInventory class that extends the Inventory class to handle specific logic for Products.
 */
class ProductInventory extends Inventory {
  /**
   * Initializes the ProductInventory by passing the Product model to the parent Inventory class.
   */
  constructor() {
    super(Product); // Pass the Product model to the Inventory parent class
  }

  /**
   * Adds a new product to the inventory with specific handling for associated parts.
   * 
   * @param {Object} req - The request object containing product data in the body.
   * @param {Object} res - The response object used to return the result or errors.
   * @returns {Promise<void>} - Returns a JSON object of the created product or an error message.
   */
  addItem = asyncHandler(async (req, res) => {
    const { name, price, stock, min, max, associatedParts } = req.body;

    try {
      // Create a new product with associated parts
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
      this.handleValidationError(error, res, "Unable to add new product.");
    }
  });

  /**
   * Updates an existing product by its ID with specific handling for associated parts.
   * 
   * @param {Object} req - The request object containing the ID in the URL parameters and update data in the body.
   * @param {Object} res - The response object used to return the updated product or errors.
   * @returns {Promise<void>} - Returns a JSON object of the updated product or an error message.
   * @throws {Error} If the ID format is invalid or the product is not found.
   */
  updateItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, min, max, associatedParts } = req.body;

    try {
      // Check if the ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid ID format");
      }

      const product = await Product.findById(id);
      if (product) {
        // Update product fields based on the request body
        product.name = name;
        product.price = price;
        product.stock = stock;
        product.min = min;
        product.max = max;
        product.associatedParts = associatedParts;

        const updatedProduct = await product.save(); // Save the updated product
        res.status(200).json(updatedProduct); // Return the updated product
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
    } catch (error) {
      this.handleValidationError(error, res, "Unable to update product.");
    }
  });

  /**
   * Deletes an existing product by its ID after checking if it has associated parts.
   * 
   * @param {Object} req - The request object containing the ID in the URL parameters.
   * @param {Object} res - The response object used to return the deletion result or errors.
   * @returns {Promise<void>} - Returns a message confirming the product removal or an error message.
   * @throws {Error} If the product has associated parts or if the product is not found.
   */
  deleteItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      // Check if the ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid ID format");
      }
  
      const product = await Product.findById(id);
  
      if (!product) {
        res.status(404);
        throw new Error("Product not found");
      }
  
      // Check if the product has associated parts
      if (product.associatedParts.length > 0) {
        throw new Error("Cannot delete a product with associated parts");
      }
  
      await product.deleteOne(); // Delete the product
      res.status(200).json({ message: "Product removed" }); // Return the deletion message
  
    } catch (error) {
      // Catch any errors and pass them to the asyncHandler for proper error handling
      res.status(400);
      throw new Error(error.message || "An error occurred while attempting to delete the product.");
    }
  });
}  

module.exports = ProductInventory;
