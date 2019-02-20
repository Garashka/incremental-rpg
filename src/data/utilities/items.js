import { allItems } from '../content/items/index';

export function findItemByID(id) {
  const item = allItems.find(i => i.id == id);
  return item;
}
