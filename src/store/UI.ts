import { makeAutoObservable, reaction } from "mobx";
import { Loading } from "./Loading";

type View = "dashboard" | "loadings"

export class UI {
  view: View = "dashboard";
  selectedLoading?: Loading;

  constructor() {
    makeAutoObservable(this);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const view = urlSearchParams.get("view");
    if (view === "loadings") {
      this.view = "loadings";
    }

    reaction(() => this.view, (view) => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      urlSearchParams.set("view", view);
      const newRelativePathQuery = window.location.pathname + "?" + urlSearchParams.toString();
      window.history.pushState(null, "", newRelativePathQuery);
    });
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
