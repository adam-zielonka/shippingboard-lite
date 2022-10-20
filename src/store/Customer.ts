import { makeAutoObservable } from "mobx";

export class Customer {
  constructor(
    public id: string,
    public name: string,
    public city: string,
    public country: string,  
  ) {
    makeAutoObservable(this);
  }
}
