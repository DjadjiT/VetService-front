import {Vaccin} from "./vaccin";
import {Note} from "./note";

export class HealthRecord {
  private _id?: number
  private _type: string
  private _name: string
  private _race?: string
  private _sex: string
  private _sterilised: boolean
  private _birthDate: Date
  private _vaccins?: Vaccin[]
  private _notes?: Note[]


  constructor(type: string, name: string, race: string, sex: string, sterilised: boolean, birthDate: Date, id?: number, vaccins?: Vaccin[], notes?: Note[]) {
    this._id = id;
    this._type = type;
    this._name = name;
    this._race = race;
    this._sex = sex;
    this._sterilised = sterilised;
    this._birthDate = birthDate;
    this._vaccins = vaccins;
    this._notes = notes;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get race(): string {
    return <string>this._race;
  }

  set race(value: string) {
    this._race = value;
  }

  get sex(): string {
    return this._sex;
  }

  set sex(value: string) {
    this._sex = value;
  }

  get sterilised(): boolean {
    return this._sterilised;
  }

  set sterilised(value: boolean) {
    this._sterilised = value;
  }

  get birthDate(): Date {
    return this._birthDate;
  }

  set birthDate(value: Date) {
    this._birthDate = value;
  }


  set vaccins(value: Vaccin[]) {
    this._vaccins = value;
  }

  set notes(value: Note[]) {
    this._notes = value;
  }

  get id(): number {
    return <number>this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get vaccins(): Vaccin[] {
    return <Vaccin[]>this._vaccins;
  }

  get notes(): Note[] {
    return <Note[]>this._notes;
  }
}
