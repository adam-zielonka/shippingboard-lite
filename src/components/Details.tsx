import { Button, Classes, ControlGroup, Dialog, FormGroup, InputGroup, Intent, NumericInput, Slider } from "@blueprintjs/core";
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
    
  return <Dialog className="Details" isOpen={open} title={loading.id} 
    onClose={startClose} onClosed={endClose}>
    <div className={Classes.DIALOG_BODY}>
      <section className="datetime">
        <FormGroup label="Date:" labelFor="date">
          <InputGroup id="date" value={loading.start.date}/>
        </FormGroup>
        <FormGroup label="Time:" labelFor="time">
          <InputGroup id="time" value={loading.start.time}/>
        </FormGroup>
        <FormGroup label="Duration:">
          <Slider value={loading.duration} min={0} max={8} stepSize={0.5} labelStepSize={2}
            labelRenderer={value => `${value}h`} onChange={loading.setDuration}/>
        </FormGroup>
      </section>
      <section className="ramps">
        <FormGroup label="Ramp:" className="ramps-list">
          {ramps.map((r) => 
            <Button key={r.id} onClick={() => loading.setRamp(r.id)} active={r.id === loading.ramp}
              outlined intent={r.isEmpty ? Intent.NONE : r.id === loading.ramp ? Intent.PRIMARY : Intent.DANGER}>
              {r.description}
            </Button>
          )}
        </FormGroup>
      </section>
      <section>
        <ControlGroup fill>
          <FormGroup label="Pallets:">
            <NumericInput value={loading.picked} fill/>
          </FormGroup>
          <FormGroup label="Loaded Pallets:">
            <NumericInput value={loading.pallets} fill/>
          </FormGroup>
          <FormGroup label="Truck No.:">
            <InputGroup id="date" value="CP 2022 77" fill/>
          </FormGroup>
        </ControlGroup>
      </section>
      <section className="times">
        <FormGroup label="Track arrived:">
          <InputGroup value="13:14"/>
        </FormGroup>
        <FormGroup label="Start of loading:">
          <InputGroup value="13:14"/>
        </FormGroup>
        <FormGroup label="End of loading:">
          <InputGroup value="13:14"/>
        </FormGroup>
        <FormGroup label="Track left:">
          <InputGroup value="13:14"/>
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
