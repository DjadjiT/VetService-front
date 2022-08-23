import {User} from "./user";
import {HealthRecord} from "./healthRecord";

export class Appointement {
  private _date : Date
  private _client: User
  private _veterinary: User
  private _appointementType: string
  private _requestDate: Date
  private _healthRecord: HealthRecord
  private _appointementDuration: number


  constructor(date: Date, client: User, veterinary: User, appointementType: string, requestDate: Date, healthRecordId: HealthRecord, appointementDuration: number) {
    this._date = date;
    this._client = client;
    this._veterinary = veterinary;
    this._appointementType = appointementType;
    this._requestDate = requestDate;
    this._healthRecord = healthRecordId;
    this._appointementDuration = appointementDuration;
  }

  get appointementType(): string {
    return this._appointementType;
  }

  set appointementType(value: string) {
    this._appointementType = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get client(): User {
    return this._client;
  }

  set client(value: User) {
    this._client = value;
  }

  get veterinary(): User {
    return this._veterinary;
  }

  set veterinary(value: User) {
    this._veterinary = value;
  }

  get requestDate(): Date {
    return this._requestDate;
  }

  set requestDate(value: Date) {
    this._requestDate = value;
  }

  get healthRecord(): HealthRecord {
    return this._healthRecord;
  }

  set healthRecord(value: HealthRecord) {
    this._healthRecord = value;
  }

  get appointementDuration(): number {
    return this._appointementDuration;
  }

  set appointementDuration(value: number) {
    this._appointementDuration = value;
  }
}
