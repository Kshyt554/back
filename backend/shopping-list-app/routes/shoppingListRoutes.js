const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');
const shoppingListController = require('../controllers/shoppingListController');


router.get('/list', authorize('owner'), shoppingListController.getShoppingLists);
router.post('/create', authorize('owner'), shoppingListController.createShoppingList);
router.get('/get/:listId', authorize('owner'), shoppingListController.getSingleShoppingList);
router.delete('/delete/:listId', authorize('owner'), shoppingListController.deleteShoppingList);
router.put('/update/:listId', authorize('owner'), shoppingListController.updateShoppingList);

module.exports = router;
