import { makeAutoObservable } from "mobx";
import { api } from "./api";
import { Customer } from "./Customer";
import { UI } from "./UI";

export class Store {
  ui = new UI();
  customers: Customer[];

  constructor() {
    makeAutoObservable(this);

    this.customers = api.getCustomers();
  }
}

export const store = new Store();

declare global {
  interface Window {
    store: Store
  }
}

window.store = store;

