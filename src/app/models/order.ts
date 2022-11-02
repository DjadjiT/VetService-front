export class Order {
  _id: string
  name: string
  street: string
  postalCode: string
  city: string
  status: string
  mail: string
  price: string
  csId: string
  shippingMethod: string
  requestDate: Date
  item: any[]


  constructor(id: string, name: string, street: string, postalCode: string, city: string, status: string, mail: string, price: string, csId: string, shippingMethod: string, requestDate: Date, item: any[]) {
    this._id = id;
    this.name = name;
    this.street = street;
    this.postalCode = postalCode;
    this.city = city;
    this.status = status;
    this.mail = mail;
    this.price = price;
    this.csId = csId;
    this.shippingMethod = shippingMethod;
    this.requestDate = requestDate;
    this.item = item;
  }


}
