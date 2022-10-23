import { makeAutoObservable } from "mobx";
import { Customer } from "./Customer";
import { store } from "./Store";

type Delivery = {
  ship_to: string;
}

export class Loading {
  constructor(
    public id: string,
    public ramp: string,
    public pallets: number,
    public picked: number,
    public start: DateTime,
    public end: DateTime,
    public deliveries: Delivery[],
  ) {
    makeAutoObservable(this);
  }

  get customer(): Customer | undefined {
    if (!this.deliveries.length) {
      return undefined;
    }

    return store.customers.find(c => this.deliveries[0].ship_to === c.id);
  }

  get duration(): number {
    return this.start.duration(this.end); 
  }

  setRamp = (ramp: string) => {
    this.ramp = ramp;
  };

  setDuration = (value: number) => {
    this.end = new DateTime(new Date(this.start.dateTime.getTime() + value * 3600000));
  };

  static create = (): Loading => {
    return new Loading("New", "001", 0, 0, new DateTime(new Date()), new DateTime(new Date()), []);
  };
}

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
    return (dt.dateTime.getTime() - this.dateTime.getTime())/(3600000);
  };
}
