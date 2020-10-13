import { ItemList } from './itemList';

export interface ItemListManager {
  addList: (itemList: ItemList) => void;
  getAllLists: () => Map<string, ItemList>;
  getList: (listId: string) => ItemList | undefined;
  deleteList: (listId: string) => void;
  addNewItemToList: (listId: string | undefined, itemDescription: string | undefined, itemChecked: boolean) => boolean;
}
