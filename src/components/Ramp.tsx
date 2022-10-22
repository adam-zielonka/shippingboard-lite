import { Card, Elevation } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { store } from "../store/Store";
import "./Ramp.scss";

export const Ramp = observer((ramp: { id: string, ids: number[] }) => {
  
  return <Card className="Ramp" elevation={Elevation.ONE}>
    <header>{ramp.id}</header>
    <main>
      {ramp.ids.map((id, i) => <Loading key={i} id={id}/>)}
    </main>
  </Card>;
});

export const Loading = observer(({ id }: { id: number }) => {
  const { ui, customers } = store;
  
  return <Card className="Loading" elevation={Elevation.TWO} interactive onClick={ui.openLoadingDialog}>
    <header>
      <div>2077</div>
    </header>
    <main>
      <div className="details">
      05/18 
        <div>
          <span>09:00</span>-12:00
        </div>
      </div>
      <div className="customer">
        <div className="name">{customers[id].name}</div>
        <div className="city">{customers[id].country}, {customers[id].city}</div>
        <div className="id">{customers[id].id.replace(/^0*/,"")}</div>
      </div>
    </main>
    <footer>
      <div>
        <b>14</b> of <b>36</b>
      </div>
    </footer>
  </Card>;
});
