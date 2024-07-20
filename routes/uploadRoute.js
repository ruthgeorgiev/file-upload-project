const express = require('express');
const { singleUpload, multipleUpload } = require('../middleware/upload');
const { handleSingleUpload, handleMultipleUpload } = require('../controllers/uploadController');

const router = express.Router();

router.post('/upload-profile-pic', singleUpload, handleSingleUpload);
router.post('/upload-cat-pics', multipleUpload, handleMultipleUpload);

module.exports = router;
