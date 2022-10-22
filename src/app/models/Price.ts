
export class Price {
  private _id :string
  private _currency :string
  private _unit_amount :string


  constructor(id: string, currency: string, unit_amount: string) {
    this._id = id;
    this._currency = currency;
    this._unit_amount = unit_amount;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get currency(): string {
    return this._currency;
  }

  set currency(value: string) {
    this._currency = value;
  }

  get unit_amount(): string {
    return this._unit_amount;
  }

  set unit_amount(value: string) {
    this._unit_amount = value;
  }
}
