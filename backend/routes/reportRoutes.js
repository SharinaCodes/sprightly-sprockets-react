const express = require("express");
const router = express.Router();
const {
  getLowStockReport,
  getPartsByTypeReport,
  getProductPartsAssociationReport,
} = require("../controllers/reportController");

// Route to get the Low Stock Report
router.get("/low-stock", getLowStockReport);

// Route to get the Parts by Type Report
router.get("/parts-by-type", getPartsByTypeReport);

// Route to get the Product Parts Association Report
router.get("/product-parts-association", getProductPartsAssociationReport);

module.exports = router;
