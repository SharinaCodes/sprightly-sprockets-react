const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

/**
 * Base class for inventory management.
 * Provides common methods for adding, retrieving, updating, and deleting items.
 */
class Inventory {
  /**
   * @param {mongoose.Model} model - The Mongoose model to be used for operations (e.g., Part, Product).
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * Adds a new item to the inventory.
   *
   * @param {Object} req - The request object containing item data in the body.
   * @param {Object} res - The response object used to return the result or errors.
   * @returns {Promise<void>} - Returns a JSON object of the created item or an error message.
   */
  addItem = asyncHandler(async (req, res) => {
    const item = new this.model(req.body);

    try {
      const createdItem = await item.save();
      res.status(201).json(createdItem);
    } catch (error) {
      this.handleValidationError(
        error,
        res,
        `Unable to add new ${this.model.modelName}`
      );
    }
  });

  /**
   * Retrieves all items from the inventory.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object used to return the list of items.
   * @returns {Promise<void>} - Returns a JSON array of all items or an error message.
   */
  getAllItems = asyncHandler(async (req, res) => {
    const items = await this.model.find();
    res.status(200).json(items);
  });

  /**
   * Looks up an item by its ID.
   *
   * @param {Object} req - The request object containing the ID in the URL parameters.
   * @param {Object} res - The response object used to return the item or errors.
   * @returns {Promise<void>} - Returns a JSON object of the found item or an error message.
   * @throws {Error} If the ID format is invalid or the item is not found.
   */
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

  /**
   * Looks up items by name (case-insensitive, partial match).
   *
   * @param {Object} req - The request object containing the name in the URL parameters.
   * @param {Object} res - The response object used to return matching items or errors.
   * @returns {Promise<void>} - Returns a JSON array of matching items or an error message.
   */
  lookupItemByName = asyncHandler(async (req, res) => {
    const { name } = req.params;

    if (!name || name.trim() === "") {
      return await this.getAllItems(req, res);
    }

    const items = await this.model.find({ name: new RegExp(name, "i") });

    if (items.length === 0) {
      res.status(404);
      throw new Error(`No ${this.model.modelName}s found`);
    }

    res.status(200).json(items);
  });

  /**
   * Updates an item by its ID.
   *
   * @param {Object} req - The request object containing the ID in the URL parameters and update data in the body.
   * @param {Object} res - The response object used to return the updated item or errors.
   * @returns {Promise<void>} - Returns a JSON object of the updated item or an error message.
   * @throws {Error} If the ID format is invalid or the item is not found.
   */
  updateItem = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid ID format");
    }

    const updatedItem = await this.model.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedItem) {
      res.status(404);
      throw new Error(`${this.model.modelName} not found`);
    }

    res.status(200).json(updatedItem);
  });

  /**
   * Deletes an item by its ID.
   *
   * @param {Object} req - The request object containing the ID in the URL parameters.
   * @param {Object} res - The response object used to return a success message or errors.
   * @returns {Promise<void>} - Returns a success message or an error message.
   * @throws {Error} If the ID format is invalid or the item is not found.
   */
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

  /**
   * Handles validation errors and sends a response.
   *
   * @param {Error} error - The error object.
   * @param {Object} res - The response object used to send the error message.
   * @param {string} message - A custom error message.
   */
  handleValidationError(error, res, message) {
    res.status(400).json({ message: error.message || message });
  }
}

module.exports = Inventory;
