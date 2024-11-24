const express = require('express');
const bodyParser = require('body-parser');
const shoppingListRoutes = require('./routes/shoppingListRoutes');
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');  
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser.json());

// Подключаем маршруты
app.use('/shoppingList', shoppingListRoutes);
app.use('/item', itemRoutes);
app.use('/user', userRoutes);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;  
