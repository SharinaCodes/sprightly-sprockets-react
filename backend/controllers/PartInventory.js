const Inventory = require("./Inventory");
const Part = require("../models/partModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

class PartInventory extends Inventory {
  constructor() {
    super(Part); // Pass the Part model to the Inventory parent class
  }

  // Override addItem to handle specific logic for Parts (e.g., InHouse vs. Outsourced)
  addItem = asyncHandler(async (req, res) => {
    const { name, price, stock, min, max, type, machineId, companyName } = req.body;

    try {
      // Create a new part with conditional handling for machineId and companyName
      const part = new Part({
        name,
        price,
        stock,
        min,
        max,
        type,
        machineId: type === "InHouse" ? machineId : null, // Conditionally handle machineId for InHouse
        companyName: type === "Outsourced" ? companyName : null, // Conditionally handle companyName for Outsourced
      });

      const createdPart = await part.save();
      res.status(201).json(createdPart); // Return the created part
    } catch (error) {
      this.handleValidationError(error, res, "Unable to add new part.");
    }
  });

  // Override updateItem to handle specific logic for Parts
  updateItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, min, max, type, machineId, companyName } = req.body;

    try {
      // Check if the ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid ID format");
      }

      const part = await Part.findById(id);
      if (part) {
        // Update part fields based on the request body
        part.name = name;
        part.price = price;
        part.stock = stock;
        part.min = min;
        part.max = max;
        part.type = type;
        part.machineId = type === "InHouse" ? machineId : null; // Conditionally update machineId
        part.companyName = type === "Outsourced" ? companyName : null; // Conditionally update companyName

        const updatedPart = await part.save(); // Save the updated part
        res.status(200).json(updatedPart); // Return the updated part
      } else {
        res.status(404);
        throw new Error("Part not found");
      }
    } catch (error) {
      this.handleValidationError(error, res, "Unable to update part.");
    }
  });
}

module.exports = PartInventory;
