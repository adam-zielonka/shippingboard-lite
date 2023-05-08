import { makeAutoObservable, reaction } from "mobx";
import { Loading } from "./Loading";
import { store } from "./Store";

type View = "dashboard" | "loadings"

function addQueryParam(name: string, value: string, defaultValue: string) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  if (value !== defaultValue) {
    urlSearchParams.set(name, value);
  } else {
    urlSearchParams.delete(name);
  }
  const newRelativePathQuery = window.location.pathname + "?" + urlSearchParams.toString();
  window.history.pushState(null, "", newRelativePathQuery);
}

export class UI {
  selectedLoading?: Loading;

  constructor() {
    makeAutoObservable(this);
  }

  init = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    
    const loadingId = urlSearchParams.get("loading");
    if (loadingId) {
      const loading = store.loadings.find(l => l.id === loadingId);
      if (loading) {
        this.selectedLoading = loading;
      }
    }

    reaction(() => this.selectedLoading, loading => addQueryParam("loading", loading?.id ?? "", ""));
  };

  get isLoadingDialogOpen(): boolean {
    return !!this.selectedLoading;
  }

  openLoadingDialog = (loading: Loading) => {
    this.selectedLoading = loading;
  };

  closeLoadingDialog = () => {
    this.selectedLoading = undefined;
  };
}
