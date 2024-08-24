const express = require("express");
const router = express.Router();
const {
  getPartsTimestampReport,
  getProductsTimestampReport,
  getUsersTimestampReport
} = require("../controllers/reportController");

// Route to get the Low Stock Report
router.get("/parts-timestamp", getPartsTimestampReport);

// Route to get the Parts by Type Report
router.get("/products-timestamp", getProductsTimestampReport);

// Route to get the Product Parts Association Report
router.get("/users-timestamps", getUsersTimestampReport);

module.exports = router;