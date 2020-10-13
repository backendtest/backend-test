import { Item } from './item';
import { ItemList as IItemList } from '../interfaces/itemList';
import { ItemListManager as IItemListManager } from '../interfaces/itemListManager';

export class ItemListManager implements IItemListManager {
  private itemListMap: Map<string, IItemList>;

  constructor() {
    this.itemListMap = new Map<string, IItemList>();
  }

  addNewItemToList = (
    listId: string | undefined,
    itemDescription: string | undefined,
    itemChecked: boolean): boolean => {
    if (!listId) {
      return false;
    }
    const itemList = this.getList(listId);
    if (!itemList) {
      return false;
    }
    const iDescription = itemDescription ? itemDescription : '';
    const item = new Item(iDescription, itemChecked);
    itemList.addItem(item);
    return true;
  }

  addList = (itemList: IItemList): void => {
    if (this.itemListMap.has(itemList.getId())) {
      console.log(`ItemListManager already contains list ${itemList.getId()}`);
    } else {
      this.itemListMap.set(itemList.getId(), itemList);
    }
  }

  getAllLists = (): Map<string, IItemList> => {
    return this.itemListMap;
  }

  getList = (listId: string): IItemList | undefined => {
    return this.itemListMap.get(listId);
  }

  deleteList = (listId: string): void => {
    if (this.itemListMap.has(listId)) {
      this.itemListMap.delete(listId);
    } else {
      console.log(`ItemListManager does not contain list ${listId}`);
    }
  }
}
