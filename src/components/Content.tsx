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
  return <div></div>;
});
