import { observer } from "mobx-react-lite";
import { store } from "../store/Store";
import { RampBox } from "./Ramp";
import { LoadingsTable } from "./LoadingsTable";
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
