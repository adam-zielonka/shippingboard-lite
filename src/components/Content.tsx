import { observer } from "mobx-react-lite";
import { store } from "../store/Store";
import { Ramp } from "./Ramp";
import "./Content.scss";

export const Content = observer(() => {
  const { ui, ramps } = store;

  if (ui.isLoadingsOpen) {
    return <LoadingsTable/>;
  }

  return <div className="Content">
    {ramps.map(ramp => <Ramp key={ramp.id} ramp={ramp} />)}
  </div>;
});

export const LoadingsTable = observer(() => {
  return <div className="LoadingsTable">
    {store.loadings.map(l => <div className="line" key={l.id} 
      onClick={() => store.ui.openLoadingDialog(l)}>
      <div>{l.id}</div>
      <div>{l.start.date}</div>
      <div>{l.start.time}</div>
      <div>{l.end.time}</div>
      <div>{l.picked}</div>
      <div>{l.pallets}</div>
      <div>{l.ramp?.description}</div>
    </div>)}
  </div>;
});
