import { Identifiable } from "./identifiable";
import { Item } from "./item";
import { Nameable } from "./nameable";

export interface ItemList extends Identifiable, Nameable {
  addItem: (item: Item) => void;
  deleteItem: (itemId: string) => void;
  getAllItems: () => Map<string, Item>;
  getItem: (itemId: string) => Item | undefined;
  removeItem: (itemId: string) => void;
}
