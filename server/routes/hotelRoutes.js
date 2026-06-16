const express = require("express");
const router = express.Router();

const { fetchHotels } = require("../controllers/hotelController");

router.get("/", fetchHotels);

module.exports = router;
