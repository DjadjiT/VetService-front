
export class Invoice {
  private _id :string
  private _invoiceUrl :string
  private _startDate :string


  constructor(id: string, invoiceUrl: string, startDate: string) {
    this._id = id;
    this._invoiceUrl = invoiceUrl;
    this._startDate = startDate;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get invoiceUrl(): string {
    return this._invoiceUrl;
  }

  set invoiceUrl(value: string) {
    this._invoiceUrl = value;
  }

  get startDate(): string {
    return this._startDate;
  }

  set startDate(value: string) {
    this._startDate = value;
  }
}
