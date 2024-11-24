const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware('Owner'), shoppingListController.createShoppingList);

module.exports = router;
