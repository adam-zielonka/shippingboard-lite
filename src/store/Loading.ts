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
    public start: number,
    public end: number,
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
}
