import { v4 as uuidv4 } from 'uuid';
import { Item as IItem } from '../interfaces/item';
import { ItemList as IItemList } from '../interfaces/itemList';

export class ItemList implements IItemList {
  private readonly id: string;
  private name!: string;
  private itemMap: Map<string, IItem>;

  constructor(name: string, id?: string) {
    this.setName(name);
    this.id = id ? id : uuidv4();
    this.itemMap = new Map<string, IItem>();
  }

  addItem = (item: IItem): void => {
    const itemId = item.getId();
    if (this.itemMap.has(itemId)) {
      console.log(`Item ${itemId} is already in ItemList ${this.getId()}`);
    } else {
      this.itemMap.set(itemId, item);
    }
  }

  deleteItem = (itemId: string): void => {
    if (this.itemMap.has(itemId)) {
      this.itemMap.delete(itemId);
    } else {
      console.log(`ItemList ${this.getId()} does not contain Item ${itemId}`);
    }
  }

  getAllItems = (): Map<string, IItem> => {
    return this.itemMap;
  }

  getId = (): string => {
    return this.id;
  }

  getItem = (itemId: string): IItem | undefined => {
    return this.itemMap.get(itemId);
  }

  getName = (): string => {
    return this.name;
  }

  removeItem = (itemId: string): void => {
    if (this.itemMap.has(itemId)) {
      this.itemMap.delete(itemId);
    } else {
      console.log(`ItemList ${this.getId()} does not contain Item ${itemId}`);
    }
  }

  setName = (name: string): void => {
    if (name.length <= 96) {
      this.name = name;
    } else {
      throw new Error('ItemList name length exceeds 96 character limit.');
    }
  }
}
