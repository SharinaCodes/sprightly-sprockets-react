const express = require("express");
const ProductInventory = require("../controllers/productInventory");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Instantiate ProductInventory class
const productInventory = new ProductInventory();

// Protect all routes
router.use(protect);

// Routes for products
router.route("/").post(productInventory.addItem).get(productInventory.getAllItems);
router.get("/id/:id", productInventory.lookupItemById);
router.get("/name/:name", productInventory.lookupItemByName);
router.route("/:id").put(productInventory.updateItem).delete(productInventory.deleteItem);

module.exports = router;
