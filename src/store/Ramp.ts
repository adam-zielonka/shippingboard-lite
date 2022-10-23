import { makeAutoObservable } from "mobx";
import { Loading } from "./Loading";
import { store } from "./Store";

export class Ramp {
  constructor(
    public id: string,
    public description: string,
  ) {
    makeAutoObservable(this);
  }

  get loadings(): Loading[]{
    return store.loadings.filter(l => l.ramp === this);
  }

  get isEmpty(): boolean {
    return !this.loadings.length;
  }
}
