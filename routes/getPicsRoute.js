const express = require('express');
const { getPics } = require('../controllers/getPicsController');

const router = express.Router();

router.get('/get-pics', getPics);

module.exports = router;
