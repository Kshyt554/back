const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add', authMiddleware('Owner'), itemController.addItem);

module.exports = router;
