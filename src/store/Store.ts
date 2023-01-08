import { makeAutoObservable } from "mobx";
import { api } from "../api/api";
import { Customer } from "./Customer";
import { Loading } from "./Loading";
import { Ramp } from "./Ramp";
import { UI } from "./UI";

export class Store {
  ui = new UI();
  customers: Customer[] = [];
  ramps: Ramp[] = [];
  loadings: Loading[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  init = () => {
    this.customers = api.getCustomers();
    this.ramps = api.getRamps();
    this.loadings = api.getLoadings();
    store.ui.init();
  };
}

export const store = new Store();
store.init();

declare global {
  interface Window {
    store: Store
  }
}

window.store = store;

