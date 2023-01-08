import { 
  Button, Classes, ControlGroup, Dialog, 
  FormGroup, InputGroup, Intent, NumericInput, Slider,
} from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { store } from "../store/Store";
import "./Details.scss";

export const Details = observer(() => {
  const { ui, ramps } = store;
  const loading = ui.selectedLoading;
  const [open, setOpen] = useState(true);

  function startClose() {
    setOpen(false);
  }

  function endClose() {
    ui.closeLoadingDialog();
    setOpen(true);
  }

  if (!loading) {
    return null;
  }
    
  return <Dialog className="Details" isOpen={open} title={loading.id || "New loading"} 
    onClose={startClose} onClosed={endClose}>
    <div className={Classes.DIALOG_BODY}>
      <section className="datetime">
        <FormGroup label="Date:" labelFor="date">
          <InputGroup id="date" value={loading.start.date} readOnly/>
        </FormGroup>
        <FormGroup label="Time:" labelFor="time">
          <InputGroup id="time" value={loading.start.time} readOnly/>
        </FormGroup>
        <FormGroup label="Duration:">
          <Slider value={loading.duration} min={0} max={8} stepSize={0.5} labelStepSize={2}
            labelRenderer={value => `${value}h`} onChange={loading.setDuration}/>
        </FormGroup>
      </section>
      <section className="ramps">
        <FormGroup label="Ramp:" className="ramps-list">
          {ramps.map((r) => <Button key={r.id} className="ramp-button" outlined 
            active={r === loading.ramp} onClick={() => loading.setRamp(r)} 
            intent={r.isEmpty ? Intent.NONE : r === loading.ramp ? Intent.PRIMARY : Intent.DANGER}>
            {r.description}
            <sup>{r.quantity > 0 && r.quantity}</sup>
          </Button>)}
          <Button onClick={loading.clearRamp} active={!loading.ramp} outlined className="ramp-button">∅</Button>
        </FormGroup>
      </section>
      <section>
        <ControlGroup fill>
          <FormGroup label="Pallets:">
            <NumericInput value={loading.picked} fill readOnly/>
          </FormGroup>
          <FormGroup label="Loaded Pallets:">
            <NumericInput value={loading.pallets} fill readOnly/>
          </FormGroup>
          <FormGroup label="Truck No.:">
            <InputGroup id="date" value="CP 2022 77" fill readOnly/>
          </FormGroup>
        </ControlGroup>
      </section>
      <section className="times">
        <FormGroup label="Track arrived:">
          <InputGroup value="13:14" readOnly/>
        </FormGroup>
        <FormGroup label="Start of loading:">
          <InputGroup value="13:14" readOnly/>
        </FormGroup>
        <FormGroup label="End of loading:">
          <InputGroup value="13:14" readOnly/>
        </FormGroup>
        <FormGroup label="Track left:">
          <InputGroup value="13:14" readOnly/>
        </FormGroup>
      </section>
    </div>
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button onClick={ui.closeLoadingDialog}>Close</Button>
      </div>
    </div>
  </Dialog>;
});
