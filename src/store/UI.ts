import { makeAutoObservable } from "mobx";
import { Loading } from "./Loading";

type View = "dashboard" | "loadings"

export class UI {
  view: View = "dashboard";
  // isLoadingDialogOpen = false;
  selectedLoading?: Loading;

  constructor() {
    makeAutoObservable(this);
  }

  get isDashboardOpen(): boolean {
    return this.view === "dashboard";
  }

  get isLoadingsOpen(): boolean {
    return this.view === "loadings";
  }

  get isLoadingDialogOpen(): boolean {
    return !!this.selectedLoading;
  }

  openDashboard = () => {
    this.view = "dashboard";
  };

  openLoadings = () => {
    this.view = "loadings";
  };

  openLoadingDialog = (loading: Loading) => {
    this.selectedLoading = loading;
  };

  closeLoadingDialog = () => {
    this.selectedLoading = undefined;
  };
}
