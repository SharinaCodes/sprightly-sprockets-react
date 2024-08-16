const asyncHandler = require("express-async-handler");
const Part = require("../models/partModel");
const mongoose = require("mongoose");
const handleValidationError = require("../utils/errorHandler");

// @desc    Create a part
// @route   POST /api/parts
// @access  Private
const addPart = asyncHandler(async (req, res) => {
  const { name, price, stock, min, max, type, machineId, companyName } =
    req.body;

  try {
    const part = new Part({
      name,
      price,
      stock,
      min,
      max,
      type,
      machineId: type === "InHouse" ? machineId : null,
      companyName: type === "Outsourced" ? companyName : null,
    });

    const createdPart = await part.save();
    res.status(201).json(createdPart);
  } catch (error) {
    handleValidationError(error, res, "Unable to add new part.");
  }
});

// @desc    Get all parts
// @route   GET /api/parts
// @access  Private
const getAllParts = asyncHandler(async (req, res) => {
  const parts = await Part.find();
  res.status(200).json(parts);
});

// @desc    Get parts by name (partial, case-insensitive)
// @route   GET /api/parts/name/:name
// @access  Private
const lookupPartByName = asyncHandler(async (req, res) => {
  const { name } = req.params;

  try {
    // Use a regular expression for partial, case-insensitive matching
    const parts = await Part.find({ name: new RegExp(name, "i") });

    if (parts.length === 0) {
      res.status(404);
      throw new Error("No parts found");
    }

    res.status(200).json(parts);
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Error occurred during the search" });
  }
});

// @desc    Get a part by ID
// @route   GET /api/parts/id/:id
// @access  Private
const lookupPartById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid ID format");
    }

    const part = await Part.findById(id);

    if (!part) {
      res.status(404);
      throw new Error("Part not found");
    }

    res.status(200).json(part);
  } catch (error) {
    res.status(400).json({ message: error.message || "Part not found" });
  }
});

// @desc    Update a part by ID
// @route   PUT /api/parts/:id
// @access  Private
const updatePart = asyncHandler(async (req, res) => {
  const partId = req.params.id;
  const { name, price, stock, min, max, type, machineId, companyName } =
    req.body;

  try {
    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(partId)) {
      res.status(400);
      throw new Error("Invalid ID format");
    }

    const part = await Part.findById(partId);
    if (part) {
      part.name = name;
      part.price = price;
      part.stock = stock;
      part.min = min;
      part.max = max;
      part.type = type;
      part.machineId = type === "InHouse" ? machineId : null;
      part.companyName = type === "Outsourced" ? companyName : null;

      const updatedPart = await part.save();
      res.status(200).json(updatedPart);
    } else {
      res.status(404);
      throw new Error("Part not found");
    }
  } catch (error) {
    handleValidationError(error, res, "Unable to update part");
  }
});

// @desc    Delete a part by ID
// @route   DELETE /api/parts/:id
// @access  Private
const deletePart = asyncHandler(async (req, res) => {
  const partId = req.params.id;

  try {
    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(partId)) {
      res.status(400);
      throw new Error("Invalid ID format");
    }

    // Find the part by ID
    const part = await Part.findById(partId);

    if (part) {
      // Delete the part
      await part.deleteOne();
      res.status(200).json({ message: "Part removed" });
    } else {
      res.status(404);
      throw new Error("Part not found");
    }
  } catch (error) {
    res
      .status(400)
      .json({
        message:
          error.message ||
          "An error occurred while attempting to delete the part",
      });
  }
});

module.exports = {
  addPart,
  getAllParts,
  lookupPartById,
  lookupPartByName,
  updatePart,
  deletePart,
};
