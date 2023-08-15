const express = require('express');
const { generateImageUrl } = require('./controller');
const upload = require('../../../middlewares/multer');
const router = express();

router.post(
    '/images',
    upload.single('image'),
    generateImageUrl,
);

module.exports = router;