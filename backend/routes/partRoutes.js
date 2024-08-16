const express = require("express");
const router = express.Router();
const {
  addPart,
  getAllParts,
  lookupPart,
  updatePart,
  deletePart,
} = require("../controllers/partController");

// Route to add a new part and get all parts
router.route("/")
    .post(addPart)
    .get(getAllParts);

// Route to get, update, and delete a specific part by ID
router.route("/:id")
    .get(lookupPart)
    .put(updatePart)
    .delete(deletePart);

module.exports = router;
