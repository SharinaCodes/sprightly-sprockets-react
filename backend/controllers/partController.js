const asyncHandler = require("express-async-handler");
const Part = require("../models/partModel");

// @desc    Create a part
// @route   POST /api/parts
// @access  Private
const addPart = asyncHandler(async (req, res) => {
    const { name, price, stock, min, max, type, machineId, companyName } = req.body;
  
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
      res.status(400);
  
      if (error.name === "ValidationError") {
        // Collect all validation error messages from Mongoose
        const messages = Object.values(error.errors).map(err => err.message);
  
        // Return a combined error message
        res.json({ message: messages.join(", ") });
      } else {
        res.json({ message: "Unable to add new part" });
      }
    }
  });

// @desc    Get all parts
// @route   GET /api/parts
// @access  Private
const getAllParts = asyncHandler(async (req, res) => {
  // Logic to retrieve all parts from the inventory
  res.status(200).json({ message: "Retrieved all parts" });
});

// @desc    Get a part by ID
// @route   GET /api/parts/:id
// @access  Private
const lookupPart = asyncHandler(async (req, res) => {
  const partId = req.params.id;
  // Logic to find a part by its ID
  res.status(200).json({ message: `Retrieved part with ID: ${partId}` });
});

// @desc    Update a part by ID
// @route   PUT /api/parts/:id
// @access  Private
const updatePart = asyncHandler(async (req, res) => {
  const partId = req.params.id;
  // Logic to update a part by its ID
  res.status(200).json({ message: `Updated part with ID: ${partId}` });
});

// @desc    Delete a part by ID
// @route   DELETE /api/parts/:id
// @access  Private
const deletePart = asyncHandler(async (req, res) => {
  const partId = req.params.id;
  // Logic to delete a part by its ID
  res.status(200).json({ message: `Deleted part with ID: ${partId}` });
});

module.exports = {
  addPart,
  getAllParts,
  lookupPart,
  updatePart,
  deletePart,
};
