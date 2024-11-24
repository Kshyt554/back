const items = [];

class Item {
  static create({ name, quantity, listId, completed }) {
    const newItem = {
      itemId: String(items.length + 1),
      name,
      quantity,
      completed,
      listId
    };
    items.push(newItem);
    return newItem;
  }
}

module.exports = Item;
