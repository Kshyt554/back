const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/list', itemController.getItems);
router.get('/get/:itemId', itemController.getItemById);
router.post('/create', itemController.createItem);
router.delete('/delete/:itemId', itemController.deleteItem);
router.put('/update/:itemId', itemController.updateItem);

module.exports = router;
