const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

class Inventory {
  constructor(model) {
    this.model = model; // The model (Part or Product) will be passed in the child class
  }

  // Method to add an item
  addItem = asyncHandler(async (req, res) => {
    const item = new this.model(req.body);

    try {
      const createdItem = await item.save();
      res.status(201).json(createdItem);
    } catch (error) {
      this.handleValidationError(error, res, `Unable to add new ${this.model.modelName}`);
    }
  });

  // Method to get all items
  getAllItems = asyncHandler(async (req, res) => {
    const items = await this.model.find();
    res.status(200).json(items);
  });

  // Method to lookup item by ID
  lookupItemById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid ID format");
    }

    const item = await this.model.findById(id);

    if (!item) {
      res.status(404);
      throw new Error(`${this.model.modelName} not found`);
    }

    res.status(200).json(item);
  });

  // Method to lookup item by name (case-insensitive)
  lookupItemByName = asyncHandler(async (req, res) => {
    const { name } = req.params;

    if (!name || name.trim() === '') {
      return await this.getAllItems(req, res);
    }

    const items = await this.model.find({ name: new RegExp(name, "i") });

    if (items.length === 0) {
      res.status(404);
      throw new Error(`No ${this.model.modelName}s found`);
    }

    res.status(200).json(items);
  });

  // Method to update an item by ID
  updateItem = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid ID format");
    }

    const updatedItem = await this.model.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedItem) {
      res.status(404);
      throw new Error(`${this.model.modelName} not found`);
    }

    res.status(200).json(updatedItem);
  });

  // Method to delete an item by ID
  deleteItem = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid ID format");
    }

    const item = await this.model.findById(id);
    if (!item) {
      res.status(404);
      throw new Error(`${this.model.modelName} not found`);
    }

    await item.deleteOne();
    res.status(200).json({ message: `${this.model.modelName} removed` });
  });

  // Shared error handling method
  handleValidationError(error, res, message) {
    res.status(400).json({ message: error.message || message });
  }
}

module.exports = Inventory;
