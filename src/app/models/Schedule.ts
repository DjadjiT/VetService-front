
export class Schedule {
  private _startingHour?: string
  private _pauseStart?: string
  private _pauseFinish?: string
  private _finishingHour?: string
  private _workingDay: boolean[]


  constructor(workingDay: boolean[], startingHour: string | undefined,
              pauseStart: string | undefined, pauseFinish: string | undefined, finishingHour: string | undefined){
    this._startingHour = startingHour;
    this._pauseStart = pauseStart;
    this._pauseFinish = pauseFinish;
    this._finishingHour = finishingHour;
    this._workingDay = workingDay;
  }


  get pauseStart(): string {
    return <string>this._pauseStart;
  }

  set pauseStart(value: string) {
    this._pauseStart = value;
  }

  get pauseFinish(): string {
    return <string>this._pauseFinish;
  }

  set pauseFinish(value: string) {
    this._pauseFinish = value;
  }

  get startingHour(): string {
    return <string>this._startingHour;
  }

  set startingHour(value: string) {
    this._startingHour = value;
  }

  get finishingHour(): string {
    return <string>this._finishingHour;
  }

  set finishingHour(value: string) {
    this._finishingHour = value;
  }

  get workingDay(): boolean[] {
    return this._workingDay;
  }

  set workingDay(value: boolean[]) {
    this._workingDay = value;
  }
}
