const express = require("express");

const { getRows } = require("../controllers/getRows");

const router = express.Router();

router.get("/", getRows);

module.exports = router;
