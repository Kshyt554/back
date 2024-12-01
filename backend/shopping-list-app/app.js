const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const shoppingListRoutes = require('./routes/shoppingListRoutes');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/shopping-list', shoppingListRoutes);

let users = [
  { userId: '123456', email: 'ivan@example.com', password: 'yourpassword', role: 'owner' },
  { userId: '123457', email: 'alice@example.com', password: 'password123', role: 'member' }
];

let shoppingLists = [
  {
    listId: "7890",
    name: "Weekly Groceries",
    ownerId: "123456",
    members: ["123457", "123458"],
    items: [
      { itemId: "101", name: "Milk", quantity: 2, completed: false },
      { itemId: "102", name: "Bread", quantity: 1, completed: true }
    ]
  },
  {
    listId: "7891",
    name: "Party Supplies",
    ownerId: "123456",
    members: ["123457"],
    items: [
      { itemId: "201", name: "Chips", quantity: 3, completed: false },
      { itemId: "202", name: "Soda", quantity: 6, completed: false }
    ]
  }
];

function generateToken(user) {
  return jwt.sign({ userId: user.userId, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
}

function authorize(role) {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
      return res.status(403).json({ error: 'Access denied: No token provided' });
    }

    jwt.verify(token, 'your-secret-key', (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Access denied: Invalid token' });
      }

      req.user = decoded; 
      if (req.user.role !== role) {
        return res.status(403).json({ error: 'Access denied' });
      }

      next(); 
    });
  };
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken(user);
  res.json({ token });
});

app.post('/shopping-list/create', authorize('owner'), (req, res) => {
  const { name, members, items } = req.body;

  console.log('Request body:', req.body);

  if (!name || !members || !items) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newShoppingList = {
    listId: shoppingLists.length + 1, 
    name,
    ownerId: req.user.userId,
    members,
    items
  };

  console.log('Created shopping list:', newShoppingList);

  shoppingLists.push(newShoppingList);
  res.json({ success: true, shoppingList: newShoppingList });
});

app.get('/shopping-list/list', authorize('owner'), (req, res) => {
  const userShoppingLists = shoppingLists.filter(list => list.ownerId === req.user.userId);
  res.json({ shoppingLists: userShoppingLists });
});

app.get('/shopping-list/get/:listId', authorize('owner'), (req, res) => {
  const { listId } = req.params;
  const shoppingList = shoppingLists.find(list => list.listId === listId && list.ownerId === req.user.userId);
  
  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  res.json({ shoppingList });
});

app.delete('/shopping-list/delete/:listId', authorize('owner'), (req, res) => {
  const { listId } = req.params;
  const listIndex = shoppingLists.findIndex(list => list.listId === listId && list.ownerId === req.user.userId);
  
  if (listIndex === -1) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  shoppingLists.splice(listIndex, 1);
  res.json({ success: true, message: 'Shopping list deleted' });
});

app.put('/shopping-list/update/:listId', authorize('owner'), (req, res) => {
  const { listId } = req.params;
  const { name, members, items } = req.body;

  const shoppingList = shoppingLists.find(list => list.listId === listId && list.ownerId === req.user.userId);

  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  shoppingList.name = name || shoppingList.name;
  shoppingList.members = members || shoppingList.members;
  shoppingList.items = items || shoppingList.items;

  res.json({ success: true, shoppingList });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
