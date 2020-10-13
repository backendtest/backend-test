import randomstring from "randomstring";
import { expect } from 'chai';
import { Item } from "../structs/item";

describe('Item tests', () => {
  it('Id tests', () => {
    const itemId1 = 'un1queId';
    const item1 = new Item('', false);
    expect(item1.getId()).to.not.be.empty;
    const item2 = new Item('', false, '');
    expect(item2.getId()).to.not.be.empty;
    const item3 = new Item('', false, itemId1);
    expect(item3.getId()).to.equal(itemId1);
  });
  it('check tests', () => {
    const item1 = new Item('', false);
    expect(item1.isChecked()).to.be.false;
    item1.check();
    expect(item1.isChecked()).to.be.true;

    const item2 = new Item('', true);
    expect(item2.isChecked()).to.be.true;
    item2.unCheck();
    expect(item2.isChecked()).to.be.false;
  });
  it('description tests', () => {
    const description1 = randomstring.generate(256);
    const description2 = randomstring.generate(257);
    const item = new Item('', false);
    expect(item.getDescription()).to.be.empty;
    item.setDescription(description1);
    expect(item.getDescription()).to.equal(description1);
    expect(() => item.setDescription(description2)).to.throw(Error);
  });
});
