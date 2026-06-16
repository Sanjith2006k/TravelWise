const express = require("express");
const router = express.Router();

const { fetchDescription } = require("../controllers/wikiController");

router.get("/", fetchDescription);

module.exports = router;
