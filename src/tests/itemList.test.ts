import randomstring from "randomstring";
import { expect } from 'chai';
import sinon from "sinon";
import { Item } from "../structs/item";
import { ItemList } from "../structs/itemList";

describe('ItemList tests without items', () => {
  it('ItemList id tests', () => {
    const id1 = 'un1queId';
    const id2 = 'un1queId';
    const itemList1 = new ItemList('', '');
    expect(itemList1.getId()).to.not.be.empty;
    const itemList2 = new ItemList('', id1);
    expect(itemList2.getId()).to.be.equal(id2);
  });
  it('ItemList name tests', () => {
    const name1 = randomstring.generate(96);
    const name2 = randomstring.generate(97);
    const itemList = new ItemList('');
    expect(itemList.getName()).to.be.empty;
    itemList.setName(name1);
    expect(itemList.getName()).to.be.equal(name1);
    expect(() => itemList.setName(name2)).to.throw(Error);
  });
});

describe('ItemList tests with items', () => {
  it('ItemList operations with Items should pass', () => {
    const itemStub1 = sinon.createStubInstance(Item);
    const itemId1 = 'itemId1';
    const itemDescription1 = 'itemDescription1';
    itemStub1.getId = sinon.stub();
    itemStub1.getId.callsFake(() => { return itemId1; });
    itemStub1.getDescription = sinon.stub();
    itemStub1.getDescription.callsFake(() => { return itemDescription1; });

    const itemStub2 = sinon.createStubInstance(Item);
    const itemId2 = 'itemId2';
    const itemDescription2 = 'itemDescription2';
    itemStub2.getId = sinon.stub();
    itemStub2.getId.callsFake(() => { return itemId2; });
    itemStub2.getDescription = sinon.stub();
    itemStub2.getDescription.callsFake(() => { return itemDescription2; });

    const itemList = new ItemList(randomstring.generate(10));
    expect(itemList.getAllItems()).to.be.empty;
    expect(itemStub1.getId()).to.be.equal(itemId1);
    expect(itemStub1.getDescription()).to.equal(itemDescription1);

    itemList.addItem(itemStub1);
    expect(itemList.getAllItems().size).to.equal(1);
    let item = itemList.getAllItems().get(itemId1);
    expect(item).to.not.be.undefined;
    expect(item?.getId()).to.not.be.undefined;
    expect(item?.getId()).to.be.equal(itemId1);

    itemList.addItem(itemStub2);
    expect(itemList.getAllItems().size).to.equal(2);
    item = itemList.getAllItems().get(itemId2);
    expect(item).to.not.be.undefined;
    expect(item?.getId()).to.not.be.undefined;
    expect(item?.getId()).to.be.equal(itemId2);

    itemList.removeItem(randomstring.generate(10));
    expect(itemList.getAllItems().size).to.equal(2);
    itemList.removeItem(itemId1);
    expect(itemList.getAllItems().size).to.equal(1);
    item = itemList.getAllItems().get(itemId1);
    expect(item).to.be.undefined;
    itemList.removeItem(itemId2);
    expect(itemList.getAllItems()).to.be.empty;
  });
});
