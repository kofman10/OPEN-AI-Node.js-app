const express = require('express');
const { imageVariation } = require('../controller/openaicontroller2');

const router = express.Router();



router.post('/imagevariation', imageVariation)

module.exports = router;