import { makeAutoObservable } from "mobx";
import { Customer } from "./Customer";
import { Ramp } from "./Ramp";
import { store } from "./Store";

type Delivery = {
  ship_to: string;
}

export class Loading {
  constructor(
    public id: string,
    public ramp: Ramp | undefined,
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

  setRamp = (ramp: Ramp) => {
    this.ramp = ramp;
  };

  clearRamp = () => {
    this.ramp = undefined;
  };

  setDuration = (value: number) => {
    this.end = new DateTime(new Date(this.start.dateTime.getTime() + value * 3600000));
  };

  static create = (): Loading => {
    const date = new Date();
    date.setMilliseconds(0);
    date.setSeconds(0);

    const loading = new Loading(
      "New",
      undefined,
      0,
      0,
      new DateTime(new Date(date)),
      new DateTime(new Date(date)),
      [],
    );

    loading.setDuration(4);

    return loading;
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
