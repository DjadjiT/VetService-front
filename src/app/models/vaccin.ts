export class Vaccin{
  private _name: String
  private _dateVaccin: Date
  private _dateRecall?: Date


  constructor(name: String, dateVaccin: Date, dateRappel?: Date) {
    this._name = name;
    this._dateVaccin = dateVaccin;
    this._dateRecall = dateRappel;
  }

  get name(): String {
    return this._name;
  }

  set name(value: String) {
    this._name = value;
  }

  get dateVaccin(): Date {
    return this._dateVaccin;
  }

  set dateVaccin(value: Date) {
    this._dateVaccin = value;
  }

  get dateRecall(): Date {
    return <Date>this._dateRecall;
  }

  set dateRecall(value: Date) {
    this._dateRecall = value;
  }
}
