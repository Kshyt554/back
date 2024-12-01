const User = require('../models/userModel');

exports.getUsers = (req, res) => {
  const allUsers = User.getAll();
  res.json(allUsers);
};

exports.getUserById = (req, res) => {
  const user = User.getById(req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
};

exports.createUser = (req, res) => {
  const { userId, name, email, role } = req.body;
  const newUser = User.create({ userId, name, email, role });
  res.status(201).json(newUser);
};

exports.deleteUser = (req, res) => {
  const success = User.delete(req.params.userId);
  if (!success) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(204).send();
};
