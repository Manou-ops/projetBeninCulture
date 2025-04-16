const express = require('express');
const { createContent, getContents } = require('../controllers/contentControlleur');
const { authenticate } = require('../midleware/auth');
const router = express.Router();

router.post('/', authenticate, createContent);
router.get('/', getContents);

module.exports = router;