const items = [];

class Item {
  static getAll() {
    return items;
  }

  static getById(itemId) {
    return items.find((item) => item.itemId === itemId);
  }

  static create({ itemId, name, quantity, completed, listId }) {
    const newItem = { itemId, name, quantity, completed, listId };
    items.push(newItem);
    return newItem;
  }

  static delete(itemId) {
    const index = items.findIndex((item) => item.itemId === itemId);
    if (index === -1) return false;
    items.splice(index, 1);
    return true;
  }

  static update(itemId, updates) {
    const item = this.getById(itemId);
    if (!item) return null;
    Object.assign(item, updates);
    return item;
  }
}

module.exports = Item;
