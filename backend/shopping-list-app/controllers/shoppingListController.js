const ShoppingList = require('../models/shoppingListModel'); 

let shoppingLists = [
  new ShoppingList("7890", "Weekly Groceries", "123456", ["123457", "123458"], [
    { itemId: "101", name: "Milk", quantity: 2, completed: false },
    { itemId: "102", name: "Bread", quantity: 1, completed: true }
  ]),
  new ShoppingList("7891", "Party Supplies", "123456", ["123457"], [
    { itemId: "201", name: "Chips", quantity: 3, completed: false },
    { itemId: "202", name: "Soda", quantity: 6, completed: false }
  ])
];

const getShoppingLists = (req, res) => {
  const userShoppingLists = shoppingLists.filter(list => list.ownerId === req.user.userId);
  res.json({ shoppingLists: userShoppingLists });
};

const createShoppingList = (req, res) => {
  const { name, members, items } = req.body;

  const newShoppingList = new ShoppingList(
    shoppingLists.length + 1, 
    name,
    req.user.userId,
    members,
    items
  );

  shoppingLists.push(newShoppingList);
  res.json({ success: true, shoppingList: newShoppingList });
};

const getSingleShoppingList = (req, res) => {
  const { listId } = req.params;
  const shoppingList = shoppingLists.find(list => list.listId === listId);

  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  res.json({ shoppingList });
};


const deleteShoppingList = (req, res) => {
  const { listId } = req.params;
  const index = shoppingLists.findIndex(list => list.listId === listId);

  if (index === -1) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  shoppingLists.splice(index, 1);
  res.json({ success: true, message: 'Shopping list deleted' });
};


const updateShoppingList = (req, res) => {
  const { listId } = req.params;
  const { name, members, items } = req.body;

  const shoppingList = shoppingLists.find(list => list.listId === listId);

  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  shoppingList.name = name || shoppingList.name;
  shoppingList.members = members || shoppingList.members;
  shoppingList.items = items || shoppingList.items;

  res.json({ success: true, shoppingList });
};

module.exports = {
  getShoppingLists,
  createShoppingList,
  getSingleShoppingList,
  deleteShoppingList,
  updateShoppingList
};
