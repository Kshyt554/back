const Item = require('../models/itemModel');

exports.getItems = (req, res) => {
  const allItems = Item.getAll();
  res.json(allItems);
};

exports.getItemById = (req, res) => {
  const item = Item.getById(req.params.itemId);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
};

exports.createItem = (req, res) => {
  const { itemId, name, quantity, completed, listId } = req.body;
  const newItem = Item.create({ itemId, name, quantity, completed, listId });
  res.status(201).json(newItem);
};

exports.deleteItem = (req, res) => {
  const success = Item.delete(req.params.itemId);
  if (!success) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.status(204).send();
};

exports.updateItem = (req, res) => {
  const updates = req.body;
  const updatedItem = Item.update(req.params.itemId, updates);
  if (!updatedItem) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(updatedItem);
};
