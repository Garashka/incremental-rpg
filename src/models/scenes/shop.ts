import { IItem, items } from 'src/models/items/item';
import _shops from 'data/content/shops.json';

// Interface for importing item data from JSON
interface IShopData {
  id: string;
  inventory: string[];
}

// Interface with items as full item model
export interface IShopInventory {
  id: string;
  inventory: IItem[];
}

export const shops = (_shops as IShopData[]).reduce((acc, shopData) => {
  acc[shopData.id] = {
    id: shopData.id,
    inventory: shopData.inventory.map((itemId: string) => items[itemId]),
  };
  return acc;
}, {} as { [id: string]: IShopInventory });

export function getShopById(id: string): IShopInventory | null {
  const shop = shops[id];

  return shop || null;
}
