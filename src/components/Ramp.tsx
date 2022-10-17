import { Card, Elevation } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import "./Ramp.css";

export const Ramp = observer((ramp: { id: string }) => {
  
  return <Card className="Ramp" interactive={true} elevation={Elevation.TWO}>
    <header>{ramp.id}</header>
    <div>RAMP</div>
  </Card>;
});
