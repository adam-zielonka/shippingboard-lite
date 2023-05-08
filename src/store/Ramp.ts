import { makeAutoObservable } from "mobx";

export class Ramp {
  constructor(
    public id: string,
    public description: string,
  ) {
    makeAutoObservable(this);
  }


}
