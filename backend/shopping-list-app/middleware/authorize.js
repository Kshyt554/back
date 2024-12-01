const jwt = require('jsonwebtoken');

module.exports = (role) => (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(403).json({ error: 'Access denied: No token provided' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Access denied: Invalid token' });
    }

    req.user = decoded; // Сохраняем пользователя в req.user
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Access denied: Incorrect role' });
    }

    next(); // Пропускаем запрос дальше
  });
};
