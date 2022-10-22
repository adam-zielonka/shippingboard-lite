import { observer } from "mobx-react-lite";
import { store } from "../store/Store";
import { Ramp } from "./Ramp";
import "./Content.scss";

export const Content = observer(() => {
  const { ui } = store;

  if (ui.isLoadingsOpen) {
    return <LoadingsTable/>;
  }

  return <div className="Content">
    <Ramp id="A" ids={[]}/>
    <Ramp id="B" ids={[0]}/>
    <Ramp id="C" ids={[1,2]}/>
    <Ramp id="D" ids={[3,4,5]}/>
    <Ramp id="E" ids={[6,0]}/>
    <Ramp id="F" ids={[]}/>
    <Ramp id="G" ids={[1,2,3]}/>
  </div>;
});

export const LoadingsTable = observer(() => {
  return <div></div>;
});
