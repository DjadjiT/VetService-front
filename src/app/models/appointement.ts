import {User} from "./user";
import {HealthRecord} from "./healthRecord";

export class Appointement {
  private _id: string
  private _date : Date
  private _client: User
  private _veterinary: User
  private _appointmentType: string
  private _requestDate: Date
  private _healthRecord: HealthRecord
  private _appointementDuration: number


  constructor(id:string, date: Date, client: User, veterinary: User, appointmentType: string, requestDate: Date, healthRecordId: HealthRecord, appointementDuration: number) {
    this._date = date;
    this._client = client;
    this._veterinary = veterinary;
    this._appointmentType = appointmentType;
    this._requestDate = new Date(requestDate);
    this._healthRecord = healthRecordId;
    this._appointementDuration = appointementDuration;
    this._id = id;
  }

  get appointmentType(): string {
    return this._appointmentType;
  }

  set appointmentType(value: string) {
    this._appointmentType = value;
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


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}
