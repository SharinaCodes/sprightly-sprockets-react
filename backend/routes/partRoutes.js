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

// Route to add a new part and get all parts
router.route("/")
    .post(addPart)
    .get(getAllParts);

// Route to get a part by ID
router.get("/id/:id", lookupPartById);

// Route to get a part by Name
router.get("/name/:name", lookupPartByName);

// Route to update and delete a specific part by ID
router.route("/:id")
    .put(updatePart)
    .delete(deletePart);

module.exports = router;
