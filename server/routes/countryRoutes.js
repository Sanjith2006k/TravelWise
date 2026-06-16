const express = require("express");
const router = express.Router();

const { fetchCountry } = require("../controllers/countryController");

router.get("/", fetchCountry);

module.exports = router;
