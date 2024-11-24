const ShoppingList = require('../models/shoppingListModel');
const AppError = require('../utils/error'); // Connecting the error class

/**
 * Getting the list of purchases by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Middleware for error handling
 */
exports.getShoppingList = (req, res, next) => {
  const { listId } = req.params;

  // Searching the shopping list by ID
  const shoppingList = ShoppingList.findById(listId);
  if (!shoppingList) {
    return next(new AppError(404, 'ListNotFound', `Shopping list with id ${listId} not found.`));
  }

  // Send the list we found
  res.status(200).json({
    ...shoppingList,
    uuAppErrorMap: {}
  });
};

/**
 * Creating a new shopping list
 */
exports.createShoppingList = (req, res, next) => {
  const { name, ownerId, members } = req.body;

  // Name uniqueness check
  const existingList = ShoppingList.findByName(name);
  if (existingList) {
    return next(new AppError(400, 'ListAlreadyExists', 'A shopping list with this name already exists.'));
  }

  const newShoppingList = ShoppingList.create({ name, ownerId, members });

  res.status(201).json({
    ...newShoppingList,
    uuAppErrorMap: {}
  });
};
