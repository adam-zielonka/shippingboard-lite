import { makeAutoObservable } from "mobx";

export class Store {
  counter = 0;

  constructor() {
    makeAutoObservable(this);
  }

  riseCounter = () => {
    this.counter++;
  };
}

export const store = new Store();

