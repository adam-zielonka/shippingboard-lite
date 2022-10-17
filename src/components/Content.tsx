import { observer } from "mobx-react-lite";
import { store } from "../store/Store";
import { Ramp } from "./Ramp";
import "./Content.css";

export const Content = observer(() => {
  const { ui } = store;

  if (ui.isLoadingsOpen) {
    return <LoadingsTable/>;
  }

  return <div className="Content">
    <Ramp id="A"/>
    <Ramp id="B"/>
    <Ramp id="C"/>
    <Ramp id="D"/>
    <Ramp id="E"/>
  </div>;
});

export const LoadingsTable = observer(() => {
  return <div></div>;
});
