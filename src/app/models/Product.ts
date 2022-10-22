import {Price} from "./Price";

export class Product {
  private _id :string
  private _images :string[]
  private _description :string
  private _name :string
  private _price :  Price


  constructor(id: string, images: string[], description: string, name: string, price: Price) {
    this._id = id;
    this._images = images;
    this._description = description;
    this._name = name;
    this._price = price;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get images(): string[] {
    return this._images;
  }

  set images(value: string[]) {
    this._images = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get price(): Price {
    return this._price;
  }

  set price(value: Price) {
    this._price = value;
  }
}
