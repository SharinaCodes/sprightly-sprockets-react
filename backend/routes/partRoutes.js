const express = require("express");
const PartInventory = require("../controllers/PartInventory");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Instantiate PartInventory class
const partInventory = new PartInventory();

// Route for getting all parts (no token required)
router.get("/", partInventory.getAllItems);

// Protected routes (these require a token)
router.post("/", protect, partInventory.addItem);  // Add part requires a token
router.get("/id/:id", protect, partInventory.lookupItemById);  // Lookup by ID requires a token
router.get("/name/:name", protect, partInventory.lookupItemByName);  // Lookup by name requires a token
router.put("/:id", protect, partInventory.updateItem);  // Update requires a token
router.delete("/:id", protect, partInventory.deleteItem);  // Delete requires a token

module.exports = router;
