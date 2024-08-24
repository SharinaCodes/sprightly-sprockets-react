const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  lookupProductById,
  lookupProductByName,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

//protect routes
router.use(protect);

router.route("/").post(addProduct).get(getAllProducts);

router.get("/id/:id", lookupProductById);

router.get("/name/:name", lookupProductByName);

router.route("/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
