const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({ msg: 'IT WORKS!' });
});

module.exports = router;
