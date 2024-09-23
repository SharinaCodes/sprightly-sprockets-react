const Inventory = require("./Inventory");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

class ProductInventory extends Inventory {
  constructor() {
    super(Product); // Pass the Product model to the Inventory parent class
  }

  // Override addItem to handle specific logic for Products (e.g., associatedParts)
  addItem = asyncHandler(async (req, res) => {
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
      this.handleValidationError(error, res, "Unable to add new product.");
    }
  });

  // Override updateItem to handle specific logic for Products
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
      this.handleValidationError(error, res, "Unable to update product.");
    }
  });

  // Override deleteItem to handle specific logic for Products (checking for associated parts)
  deleteItem = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid ID format");
    }

    const product = await Product.findById(id);
    if (product) {
      // Check if the product has associated parts
      if (product.associatedParts.length > 0) {
        throw new Error("Cannot delete a product with associated parts");
      }

      await product.deleteOne();
      res.status(200).json({ message: "Product removed" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });
}

module.exports = ProductInventory;
