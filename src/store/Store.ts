import { makeAutoObservable } from "mobx";
import { UI } from "./UI";

export class Store {
  ui = new UI();
  counter = 0;

  constructor() {
    makeAutoObservable(this);
  }

  riseCounter = () => {
    this.counter++;
  };
}

export const store = new Store();

declare global {
  interface Window {
    store: Store
  }
}

window.store = store;

