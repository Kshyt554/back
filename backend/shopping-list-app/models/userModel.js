const users = [];

class User {
  static getAll() {
    return users;
  }

  static getById(userId) {
    return users.find((user) => user.userId === userId);
  }

  static create({ userId, name, email, role }) {
    const newUser = { userId, name, email, role };
    users.push(newUser);
    return newUser;
  }

  static delete(userId) {
    const index = users.findIndex((user) => user.userId === userId);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  }
}

module.exports = User;
