import {User} from "./user";

export class Invoice {

  private _user: User
  private _amount: number
  private _date: Date


  constructor(user: User, amount: number, date: Date) {
    this._user = user;
    this._amount = amount;
    this._date = date;
  }


  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }
}
