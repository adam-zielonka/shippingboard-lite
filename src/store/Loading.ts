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
}

export class DateTime {
  constructor(private dateTime: Date) {
    makeAutoObservable(this);
  }

  get date(): string {
    return this.dateTime.toLocaleDateString("en", { month: "2-digit", day: "2-digit" });
  }

  get time(): string {
    return this.dateTime.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", hour12: false });
  }

  static fromAPI = (dataTime: number): DateTime => {
    const [, year, month, date, hours, minutes] = dataTime.toString()
      .match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/) || [];
    return new DateTime(new Date(+year, (+month)-1, +date, +hours, +minutes)); 
  };

  get toAPI(): number {
    const year = this.dateTime.getFullYear();
    const month = this.dateTime.toLocaleDateString("en", { month: "2-digit" });
    const day = this.dateTime.toLocaleDateString("en", { day: "2-digit" });
    const hour = this.dateTime.toLocaleTimeString("en", { hour: "2-digit", hour12: false });
    const minutes = this.dateTime.toLocaleTimeString("en", {  minute: "2-digit" });
    return +`${year}${month}${day}${hour}${minutes}`;
  }
}
