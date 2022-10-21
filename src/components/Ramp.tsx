import { Card, Elevation } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { store } from "../store/Store";
import "./Ramp.css";

export const Loading = observer(({ id }: { id: number }) => {
  const { ui, customers } = store;
  
  return <Card className="LoadingCard" elevation={Elevation.TWO} interactive onClick={ui.openLoadingDialog}>
    <div>
      <b>{customers[id].name}</b>
      <small style={{float: "right"}}>{customers[id].id.replace(/^0*/,"")}</small>
      <i>{customers[id].city} {customers[id].country}</i>
    </div>
  </Card>;
});

export const Ramp = observer((ramp: { id: string, ids: number[] }) => {
  
  return <Card className="Ramp" elevation={Elevation.ONE}>
    <header>{ramp.id}</header>
    <div>
      {ramp.ids.map((id, i) => <Loading key={i} id={id}/>)}
    </div>
  </Card>;
});
