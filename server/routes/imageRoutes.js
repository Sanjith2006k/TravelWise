const express = require("express");
const router = express.Router();

const { getCityImages } = require("../controllers/imageController");

router.get("/", getCityImages);

module.exports = router;
