import { v4 as uuidv4 } from 'uuid';
import { Item as IItem } from '../interfaces/item';

export class Item implements IItem {
  private readonly id: string;
  private description!: string;

  constructor(description: string, private checked: boolean, id?: string) {
    this.setDescription(description);
    this.id = id ? id : uuidv4();
  }

  check = (): void => {
    this.checked = true;
  }

  getDescription = (): string => {
    return this.description;
  }

  getId = (): string => {
    return this.id;
  }

  isChecked = (): boolean => {
    return this.checked;
  }

  setDescription = (description: string): void => {
    if (description.length <= 256) {
      this.description = description;
    } else {
      throw new Error('Item description length exceeds 256 character limit.');
    }
  }

  toString(): string {
    return `Item Id: ${this.id}, Description: ${this.description}, Checked: ${this.isChecked()}`;
  }

  unCheck = (): void => {
    this.checked = false;
  }
}
