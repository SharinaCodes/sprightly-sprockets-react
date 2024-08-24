const express = require("express");
const router = express.Router();
const {
  addPart,
  getAllParts,
  lookupPartById,
  lookupPartByName,
  updatePart,
  deletePart,
} = require("../controllers/partController");
const { protect } = require("../middleware/authMiddleware");

// Route to get all parts (Not protected)
router.get("/", getAllParts);

// Protected routes
router.post("/", protect, addPart);
router.get("/id/:id", protect, lookupPartById);
router.get("/name/:name", protect, lookupPartByName);
router.put("/:id", protect, updatePart);
router.delete("/:id", protect, deletePart);

module.exports = router;
