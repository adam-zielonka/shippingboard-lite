import { makeAutoObservable } from "mobx";
import { Loading } from "./Loading";
import { store } from "./Store";

export type Status = "empty" | "loaded" | "progress" | "not-started" | ""

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

  get isLoaded(): boolean {
    return !this.loadings.some(l => !l.isLoaded);
  }

  get isInProgress(): boolean {
    return this.loadings.some(l => l.isInProgress);
  }

  get isSomeNotStarted(): boolean {
    return this.loadings.some(l => !l.isStarted);
  }

  get quantity(): number {
    return this.loadings.length;
  }

  get status(): Status {
    if (this.isEmpty) return "empty";
    if (this.isLoaded) return "loaded";
    if (this.isSomeNotStarted) return "not-started";
    if (this.isInProgress) return "progress";

    return "";
  }
}
