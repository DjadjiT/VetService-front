export class Newsletter {
  private _message: string
  private _object: string
  private _receiver: string
  private _id?: string
  private _date?: Date


  constructor(message: string, object: string, receiver: string) {
    this._message = message;
    this._object = object;
    this._receiver = receiver;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get object(): string {
    return this._object;
  }

  set object(value: string) {
    this._object = value;
  }

  get receiver(): string {
    return this._receiver;
  }

  set receiver(value: string) {
    this._receiver = value;
  }

  get id(): string {
    return <string>this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get date(): Date {
    return <Date>this._date;
  }

  set date(value: Date) {
    this._date = value;
  }
}
