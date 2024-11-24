const shoppingLists = [];

class ShoppingList {
  static findById(listId) {
    return shoppingLists.find(list => list.listId === listId);
  }

  static findByName(name) {
    return shoppingLists.find(list => list.name === name);
  }

  static create({ name, ownerId, members = [] }) {
    const newShoppingList = {
      listId: String(shoppingLists.length + 1),
      name,
      ownerId,
      members,
      items: []
    };
    shoppingLists.push(newShoppingList);
    return newShoppingList;
  }
}

module.exports = ShoppingList;
