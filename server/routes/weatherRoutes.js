const express = require("express");
const router = express.Router();

const { searchWeather } = require("../controllers/weatherController");

router.get("/search", searchWeather);

module.exports = router;
