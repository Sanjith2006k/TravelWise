const express = require("express");
const router = express.Router();

const { fetchAttractions } = require("../controllers/attractionController");

router.get("/", fetchAttractions);

module.exports = router;
