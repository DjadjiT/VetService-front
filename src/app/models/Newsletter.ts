export class Newsletter {
  private _frequency: string
  private _message: string
  private _object: string
  private _receiver: string
  private _id?: string

  constructor(frequency: string, message: string, object: string, receiver: string, id: string | undefined) {
    this._id = id;
    this._frequency = frequency;
    this._message = message;
    this._object = object;
    this._receiver = receiver;
  }


  get id(): string {
    return <string>this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get frequency(): string {
    return this._frequency;
  }

  set frequency(value: string) {
    this._frequency = value;
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
}
