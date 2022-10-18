import { Card, Elevation } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { store } from "../store/Store";
import "./Ramp.css";

export const Ramp = observer((ramp: { id: string }) => {
  const { ui } = store;
  
  return <Card className="Ramp" interactive={true} elevation={Elevation.TWO} onClick={ui.openLoadingDialog}>
    <header>{ramp.id}</header>
    <div>RAMP</div>
  </Card>;
});
