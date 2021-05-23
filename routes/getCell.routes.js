const express = require("express");

const { getCell } = require("../controllers/getCell");

const router = express.Router();

router.post("/", getCell);

module.exports = router;