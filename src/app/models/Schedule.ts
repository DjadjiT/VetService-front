
export class Schedule {
  private _startingHour: number
  private _pauseStart: number
  private _pauseFinish: number
  private _finishingHour: number
  private _workingDay: boolean[]


  constructor(startingHour: number, pauseStart: number, pauseFinish: number, finishingHour: number,
              workingDay: boolean[]) {
    this._startingHour = startingHour;
    this._pauseStart = pauseStart;
    this._pauseFinish = pauseFinish;
    this._finishingHour = finishingHour;
    this._workingDay = workingDay;
  }


  get pauseStart(): number {
    return this._pauseStart;
  }

  set pauseStart(value: number) {
    this._pauseStart = value;
  }

  get pauseFinish(): number {
    return this._pauseFinish;
  }

  set pauseFinish(value: number) {
    this._pauseFinish = value;
  }

  get startingHour(): number {
    return this._startingHour;
  }

  set startingHour(value: number) {
    this._startingHour = value;
  }

  get finishingHour(): number {
    return this._finishingHour;
  }

  set finishingHour(value: number) {
    this._finishingHour = value;
  }

  get workingDay(): boolean[] {
    return this._workingDay;
  }

  set workingDay(value: boolean[]) {
    this._workingDay = value;
  }
}
