export class Note{
  private _informations: String
  private _date: Date


  constructor(informations: String, date: Date) {
    this._informations = informations;
    this._date = date;
  }


  get informations(): String {
    return this._informations;
  }

  set informations(value: String) {
    this._informations = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }
}
