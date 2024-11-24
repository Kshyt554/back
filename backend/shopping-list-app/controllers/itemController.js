const Item = require('../models/itemModel');

exports.addItem = (req, res) => {
  const { name, quantity, listId } = req.body;

  if (!name || !listId) {
    return res.status(400).json({
      uuAppErrorMap: { errorCode: 'InvalidInput', message: 'Name and listId are required.' }
    });
  }

  const newItem = Item.create({ name, quantity, listId, completed: false });

  res.status(201).json({
    ...newItem,
    uuAppErrorMap: {}
  });
};
