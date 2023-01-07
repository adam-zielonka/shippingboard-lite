import { observer } from "mobx-react-lite";
import { store } from "../store/Store";
import { RampBox } from "./Ramp";
import { ProgressBar } from "@blueprintjs/core";
import "./Content.scss";

export const Content = observer(() => {
  const { ui, ramps } = store;

  if (ui.isLoadingsOpen) {
    return <LoadingsTable/>;
  }

  return <div className="Content">
    {ramps.map(ramp => <RampBox key={ramp.id} ramp={ramp} />)}
  </div>;
});

export const LoadingsTable = observer(() => {
  return <div className="LoadingsTable">
    {store.loadings.map(l => <div className={"line " + l.status} key={l.id} 
      onClick={() => store.ui.openLoadingDialog(l)}>
      <div><b>{l.id}</b></div>
      <div>{l.start.date} <b>{l.start.time}</b>-{l.end.time}</div>
      <div>{l.customer?.name} <small style={{color: "gray"}}>{l.customer?.country}, {l.customer?.city}</small></div>
      <div>
        <div style={{textAlign: "center"}}><b>{l.picked}</b> of <b>{l.pallets}</b></div>
        <div><ProgressBar animate={false} value={l.loadedRatio} intent={l.isLoaded ? "success" : "primary"}/></div>
      </div>
      <div style={{textAlign: "center"}}><b>{l.ramp?.description}</b></div>
    </div>)}
  </div>;
});
