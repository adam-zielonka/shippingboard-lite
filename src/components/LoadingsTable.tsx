import { observer } from "mobx-react-lite";
import { store } from "../store/Store";
import { ProgressBar, Tag } from "@blueprintjs/core";
import "./LoadingsTable.scss";

export const LoadingsTable = observer(() => {
  return <div className="LoadingsTable">
    <header className="line">
      <div>Id</div>
      <div>Time</div>
      <div>Ship to</div>
      <div>Operator</div>
      <div>T1</div>
      <div>T2</div>
      <div>T3</div>
      <div>T4</div>
      <div>Pallets</div>
      <div>Ramp</div>
    </header>
    {store.loadings.map(l => <div className={"line"} key={l.id} 
      onClick={() => store.ui.openLoadingDialog(l)}>
      <div className="id">{l.id}</div>
      <div><b style={{fontSize: "18px"}}>{l.start.time}</b></div>
      <div>
        <div>{l.customer?.name}</div>
        <div style={{color: "gray", fontSize: "12px"}}>{l.customer?.country}, {l.customer?.city}</div>
        <div style={{color: "gray", fontSize: "12px"}}>{l.customer?.id.replace(/^0*/,"")}</div>
      </div>
      <div className="operator">
        <div>Johnny Silverhand</div>
      </div>
      <div className="time">13:14</div>
      <div className="time">13:14</div>
      <div className="time">13:14</div>
      <div className="time">13:14</div>
      <div>
        <div style={{textAlign: "left"}}><b>{l.picked}</b> of <b>{l.pallets}</b></div>
        <div><ProgressBar animate={false} value={l.loadedRatio} intent={l.isLoaded ? "success" : "primary"}/></div>
      </div>
      <div style={{textAlign: "center"}}>
        {l.ramp && <Tag intent="primary" large>{l.ramp.description}</Tag>}
      </div>
    </div>)}
  </div>;
});
