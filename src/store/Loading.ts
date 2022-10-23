import { makeAutoObservable } from "mobx";
import { Customer } from "./Customer";
import { DateTime } from "./DateTime";
import { Delivery } from "./Delivery";
import { Ramp } from "./Ramp";
import { store } from "./Store";

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

    return store.customers.find(c => this.deliveries[0].ship_to === c);
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

  setDuration = (duration: number) => {
    this.end.update(this.start.dateAfterDuration(duration));
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
