const express = require('express');

const { insertData } = require('../controllers/insertData');

const router = express.Router();

router.post('/', insertData);

module.exports = router;
