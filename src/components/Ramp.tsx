import { Card, Elevation } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { Loading as LoadingType } from "../store/Loading";
import { Ramp as RampType } from "../store/Ramp";
import { store } from "../store/Store";
import "./Ramp.scss";

export const Ramp = observer(({ ramp }: { ramp: RampType }) => {
  
  return <Card className="Ramp" elevation={Elevation.ONE}>
    <header>{ramp.description}</header>
    <main>
      {ramp.loadings.map(l => <Loading key={l.id} loading={l}/>)}
    </main>
  </Card>;
});

export const Loading = observer(({ loading }: { loading: LoadingType }) => {
  const { ui } = store;
  const { customer } = loading;
  
  return <Card className="Loading" elevation={Elevation.TWO} interactive onClick={() => ui.openLoadingDialog(loading)}>
    <header>
      <div>{loading.id}</div>
    </header>
    <main>
      <div className="details">
        {loading.start.date} 
        <div>
          <span>{loading.start.time}</span>-{loading.end.time}
        </div>
      </div>
      <div className="customer">
        {customer && <>
          <div className="name">{customer.name}</div>
          <div className="city">{customer.country}, {customer.city}</div>
          <div className="id">{customer.id.replace(/^0*/,"")}</div>
        </>}
      </div>
    </main>
    <footer>
      <div>
        <b>{loading.picked}</b> of <b>{loading.pallets}</b>
      </div>
    </footer>
  </Card>;
});
