import { Button, Classes, ControlGroup, Dialog, FormGroup, InputGroup, NumericInput, Slider } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { store } from "../store/Store";
import "./Details.scss";

export const Details = observer(() => {
  const { ui } = store;
  const [duration, setDuration] = useState(4);
  const [pallets, setPallets] = useState(3);
  const [ramp, setRamp] = useState("A");
    
  return <Dialog className="Details" isOpen={ui.isLoadingDialogOpen} title={"Loading"} onClose={ui.closeLoadingDialog}>
    <div className={Classes.DIALOG_BODY}>
      <div className="ramps">
        <FormGroup label="Ramp:" className="ramps-list">
          {["A","B","C","D","E","F","G"].map(r => 
            <Button key={r} onClick={() => setRamp(r)} active={r === ramp}>{r}</Button>
          )}
        </FormGroup>
      </div>
      <div className="times">
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
      </div>
      <div className="datetime">
        <FormGroup label="Date:" labelFor="date">
          <InputGroup id="date" value="2022-11-11"/>
        </FormGroup>
        <FormGroup label="Time:" labelFor="time">
          <InputGroup id="time" value="13:14"/>
        </FormGroup>
        <FormGroup label="Duration:">
          <Slider value={duration} min={0} max={8} stepSize={0.5} labelStepSize={2}
            labelRenderer={value => `${value}h`} onChange={setDuration}/>
        </FormGroup>
      </div>
      <ControlGroup fill>
        <FormGroup label="Pallets:">
          <NumericInput value={pallets} onValueChange={setPallets} fill/>
        </FormGroup>
        <FormGroup label="Loaded Pallets:">
          <NumericInput value={pallets} onValueChange={setPallets} fill/>
        </FormGroup>
        <FormGroup label="Truck No.:">
          <InputGroup id="date" value="CP 2022 77" fill/>
        </FormGroup>
      </ControlGroup>
    </div>
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button onClick={ui.closeLoadingDialog}>Close</Button>
      </div>
    </div>
  </Dialog>;
});
