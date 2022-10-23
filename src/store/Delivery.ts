import { makeAutoObservable } from "mobx";
import { Customer } from "./Customer";

export class Delivery {
  constructor(
    public ship_to: Customer,
  ) {
    makeAutoObservable(this);
  }
}
