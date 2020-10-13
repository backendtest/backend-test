import randomstring from "randomstring";
import express from "express";
import { Item } from "../structs/item";
import { ItemList } from "../structs/itemList";
import { ItemListManager } from "../structs/itemListManager";

export const api = express.Router();

const itemListManager = new ItemListManager();

const fakePopulate = () => {
  const itemList1 = new ItemList(randomstring.generate(5));
  itemList1.addItem(new Item(randomstring.generate(6), true));
  itemList1.addItem(new Item(randomstring.generate(10), false));

  const itemList2 = new ItemList(randomstring.generate(10));
  itemList2.addItem(new Item(randomstring.generate(12), true));
  itemList2.addItem(new Item(randomstring.generate(14), true));

  itemListManager.addList(itemList1);
  itemListManager.addList(itemList2);
}

api.get("/", (req, res) => {
  res.send(`there are ${itemListManager.getAllLists().size} lists\n`);
});

api.get('/add-new-item-to-list', (req, res) => {
  let checked = false;
  if (req.query.ItemChecked?.toString().toLocaleLowerCase() === 'true') {
    checked = true;
  }
  const listId = req.query.ListId?.toString().trim();
  const itemDescription = req.query.ItemDescription?.toString();
  if (itemListManager.addNewItemToList(listId, itemDescription, checked)) {
    res.send(`Item added to list ${listId}`);
  } else {
    res.send(`Invalid parameters`);
  }
});

api.get('/get-all-items-in-list', (req, res) => {
  let listId = req.query.ListId?.toString();
  if (listId) {
    listId = listId.trim();
    const list = itemListManager.getList(listId);
    if (list) {
      let resStr = `${list.getAllItems().size} items\n`;
      list.getAllItems().forEach(item => {
        resStr = resStr + `${item.toString()}\n`;
      });
      res.send(resStr);
    } else {
      res.send('List not found\n');
    }
  } else {
    res.send('Invalid ListId\n');
  }
});

api.get('/get-all-lists', (req, res) => {
  let resStr = `${itemListManager.getAllLists().size} lists\n`;
  itemListManager.getAllLists().forEach(l => {
    resStr = resStr + `${l.getId()}\n`;
  })
  res.send(resStr);
});

api.get('/fake-populate', function (req, res) {
  fakePopulate();
  res.send('fake populate');
});
