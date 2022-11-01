import { Card, Elevation, ProgressBar } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { Loading } from "../store/Loading";
import { Ramp } from "../store/Ramp";
import { store } from "../store/Store";
import "./Ramp.scss";

export const RampBox = observer(({ ramp }: { ramp: Ramp }) => {
  
  return <Card className="Ramp" elevation={Elevation.ONE}>
    <header>{ramp.description}</header>
    <main className={ramp.status}>
      {ramp.loadings.map(l => <LoadingBox key={l.id} loading={l}/>)}
    </main>
  </Card>;
});

export const LoadingBox = observer(({ loading }: { loading: Loading }) => {
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
      <ProgressBar animate={false} value={loading.loadedRatio} intent="success"/>
    </footer>
  </Card>;
});
