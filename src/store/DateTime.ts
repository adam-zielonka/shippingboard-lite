import { makeAutoObservable } from "mobx";

const MILLISECONDS_IN_HOUR = 3600000;

export class DateTime {
  constructor(public dateTime: Date) {
    makeAutoObservable(this);
  }

  get date(): string {
    return this.dateTime.toLocaleDateString("en", { month: "2-digit", day: "2-digit" });
  }

  get time(): string {
    return this.dateTime.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", hour12: false });
  }

  duration = (dt: DateTime): number => {
    return (dt.dateTime.getTime() - this.dateTime.getTime())/(MILLISECONDS_IN_HOUR);
  };

  update = (dateTime: Date) => {
    this.dateTime = dateTime;
  };

  dateAfterDuration = (duration: number): Date => {
    return new Date(this.dateTime.getTime() + duration * MILLISECONDS_IN_HOUR);
  };
}
