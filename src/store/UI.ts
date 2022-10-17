import { makeAutoObservable } from "mobx";

type View = "dashboard" | "loadings"

export class UI {
  view: View = "dashboard";

  constructor() {
    makeAutoObservable(this);
  }

  get isDashboardOpen(): boolean {
    return this.view === "dashboard";
  }

  get isLoadingsOpen(): boolean {
    return this.view === "loadings";
  }

  openDashboard = () => {
    this.view = "dashboard";
  };

  openLoadings = () => {
    this.view = "loadings";
  };
}
