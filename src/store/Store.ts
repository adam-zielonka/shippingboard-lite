import { makeAutoObservable } from "mobx";
import { UI } from "./UI";

export class Store {
  ui = new UI();

  constructor() {
    makeAutoObservable(this);
  }
}

export const store = new Store();

declare global {
  interface Window {
    store: Store
  }
}

window.store = store;

