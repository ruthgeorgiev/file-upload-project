const express = require('express');
const { deletePic } = require('../controllers/ deleteController');

const router = express.Router();

router.delete('/delete-pic/:id', deletePic);

module.exports = router;
