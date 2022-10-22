import {Note} from "./note";
import {Schedule} from "./Schedule";

export class User {
  private _id: string
  private _role: string
  private _birthDate: Date
  private _email: string
  private _firstName: string
  private _lastName: string
  private _phoneNb: string
  private _password?: string
  private _speciality?: string
  private _appointmentType?: string[]
  private _paymentMethod?: string[]
  private _informations?: Note
  private _institutionName?: string
  private _street?: string
  private _postalCode?: string
  private _city?: string
  private _country?: string
  private _rpps?: number
  private _schedule?: Schedule
  private _active?: boolean
  private _healthRecords?: any[]
  private _customerId?: string

  constructor(_id: string,role: string,birthDate: Date, email: string, firstName: string, lastName: string,
              phoneNb: string, password: string, speciality: string | undefined,
              appointmentType: string[] | undefined, paymentMethod: string[] | undefined,
              informations: Note | undefined, _institutionName: string | undefined, street: string | undefined, postalCode: string | undefined,
              city: string | undefined, country: string | undefined, rpps: number | undefined,
              schedule: Schedule | undefined, active: boolean | undefined, healthRecords: any[] | undefined, customerId: string | undefined) {
    this._id = _id;
    this._role = role;
    this._birthDate = birthDate;
    this._email = email;
    this._firstName = firstName;
    this._lastName = lastName;
    this._phoneNb = phoneNb;
    this._password = password;
    this._speciality = speciality;
    this._appointmentType = appointmentType;
    this._paymentMethod = paymentMethod;
    this._informations = informations;
    this._street = street;
    this._postalCode = postalCode;
    this._city = city;
    this._country = country;
    this._rpps = rpps;
    this._schedule = schedule;
    this._active = active
    this._institutionName = _institutionName
    this._healthRecords = healthRecords
    this._customerId = customerId
  }

  get birthDate(): Date {
    return this._birthDate;
  }

  set birthDate(value: Date) {
    this._birthDate = value;
  }

  get street(): string {
    return <string>this._street;
  }

  set street(value: string) {
    this._street = value;
  }

  get postalCode(): string {
    return <string>this._postalCode;
  }

  set postalCode(value: string) {
    this._postalCode = value;
  }

  get city(): string {
    return <string>this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get country(): string {
    return <string>this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get phoneNb(): string {
    return this._phoneNb;
  }

  set phoneNb(value: string) {
    this._phoneNb = value;
  }

  get password(): string {
    return <string>this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get speciality(): string {
    return <string>this._speciality;
  }

  set speciality(value: string) {
    this._speciality = value;
  }

  get paymentMethod(): string[] {
    return <string[]>this._paymentMethod;
  }

  set paymentMethod(value: string[]) {
    this._paymentMethod = value;
  }

  get informations(): Note {
    return <Note>this._informations;
  }

  set informations(value: Note) {
    this._informations = value;
  }

  get rpps(): number {
    return <number>this._rpps;
  }

  set rpps(value: number) {
    this._rpps = value;
  }

  get schedule(): Schedule {
    return <Schedule>this._schedule;
  }

  set schedule(value: Schedule) {
    this._schedule = value;
  }

  get appointmentType(): string[] {
    return <string[]>this._appointmentType;
  }

  set appointmentType(value: string[]) {
    this._appointmentType = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }


  get active(): boolean {
    return <boolean>this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }


  get institutionName(): string {
    return <string>this._institutionName;
  }

  set institutionName(value: string) {
    this._institutionName = value;
  }

  get healthRecords(): any[] {
    return <any[]>this._healthRecords;
  }

  set healthRecords(value: any[]) {
    this._healthRecords = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }


  get customerId(): string {
    return <string>this._customerId;
  }

  set customerId(value: string) {
    this._customerId = value;
  }
}
