const express = require("express");
const router = express.Router();
const {
  getPartsTimestampReport,
  getProductsTimestampReport,
  getUsersTimestampReport
} = require("../controllers/reportController");
const {protect} = require('../middleware/authMiddleware');

/**
 * Routes for reports
 */

//protect all routes
router.use(protect);

// Route to get the Low Stock Report
router.get("/parts-timestamp", getPartsTimestampReport);

// Route to get the Parts by Type Report
router.get("/products-timestamp", getProductsTimestampReport);

// Route to get the Product Parts Association Report
router.get("/users-timestamps", getUsersTimestampReport);

module.exports = router;
