import _items from 'data/content/items.json';

export interface IItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

export const items = (_items as IItem[]).reduce((acc, curr) => {
  Object.freeze(curr);
  acc[curr.id] = curr;
  return acc;
}, {} as { [id: string]: IItem });

export function getItemById(id: string): IItem | null {
  const item = items[id];

  return item || null;
}
