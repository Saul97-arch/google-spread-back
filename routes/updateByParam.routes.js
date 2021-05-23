const express = require('express');

const { updateByParam } = require('../controllers/updateByParam');

const router = express.Router();

router.post('/', updateByParam);

module.exports = router;
