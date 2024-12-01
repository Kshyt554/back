const shoppingLists = [];

class ShoppingList {

  constructor(listId, name, ownerId, members, items) {
    this.listId = listId;
    this.name = name;
    this.ownerId = ownerId;
    this.members = members;
    this.items = items;
  }

  static getAll() {
    return shoppingLists;
  }

  static getById(id) {
    return shoppingLists.find((list) => list.listId === id);  // Используем listId
  }

  static create({ name, ownerId }) {
    const newList = { listId: `${Date.now()}`, name, ownerId, items: [] };  // Используем listId
    shoppingLists.push(newList);
    return newList;
  }

  static delete(id) {
    const index = shoppingLists.findIndex((list) => list.listId === id);  // Используем listId
    if (index === -1) return false;
    shoppingLists.splice(index, 1);
    return true;
  }

  static update(id, { name }) {
    const list = this.getById(id);
    if (!list) return null;
    list.name = name || list.name;
    return list;
  }
}

module.exports = ShoppingList;
