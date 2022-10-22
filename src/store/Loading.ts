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
  private dateTime: Date;

  constructor(dataTime: string) {
    makeAutoObservable(this);

    const [, year, month, date, hours, minutes] = dataTime.match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/) || [];

    this.dateTime = new Date(+year, (+month)-1, +date, +hours, +minutes);
  }

  get date(): string {
    return `${addZero(this.dateTime.getMonth()+1)}/${addZero(this.dateTime.getDate())}`;
  }

  get time(): string {
    return `${addZero(this.dateTime.getHours())}:${addZero(this.dateTime.getMinutes())}`;
  }
}

function addZero(value: number): string {
  const text = value.toString();

  if (text.length === 1) {
    return "0" + text;
  }

  return text;
}
