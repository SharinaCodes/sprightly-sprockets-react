const express = require("express");
const PartInventory = require("../controllers/PartInventory");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Instantiate PartInventory class
const partInventory = new PartInventory();

// Protect all routes
router.use(protect);

// Routes for parts
router.route("/").post(partInventory.addItem).get(partInventory.getAllItems);
router.get("/id/:id", partInventory.lookupItemById);
router.get("/name/:name", partInventory.lookupItemByName);
router.route("/:id").put(partInventory.updateItem).delete(partInventory.deleteItem);

module.exports = router;
