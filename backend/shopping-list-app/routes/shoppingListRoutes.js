const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize'); // Импортируем middleware
const shoppingListController = require('../controllers/shoppingListController'); // Импортируем контроллеры

// Роуты для работы с shopping-list
router.get('/list', authorize('owner'), shoppingListController.getShoppingLists); // Получить все списки покупок
router.post('/create', authorize('owner'), shoppingListController.createShoppingList); // Создать новый список
router.get('/get/:listId', authorize('owner'), shoppingListController.getSingleShoppingList); // Получить один список по ID
router.delete('/delete/:listId', authorize('owner'), shoppingListController.deleteShoppingList); // Удалить список
router.put('/update/:listId', authorize('owner'), shoppingListController.updateShoppingList); // Обновить список

module.exports = router;
