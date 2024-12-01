const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/list', userController.getUsers);
router.get('/get/:userId', userController.getUserById);
router.post('/create', userController.createUser);
router.delete('/delete/:userId', userController.deleteUser);
router.get('/', shoppingListController.getAllShoppingLists);
router.get('/:listId', shoppingListController.getShoppingListById);

module.exports = router;
