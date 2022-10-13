import { Button, Card, Elevation } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { store } from "../store/Store";

import "./Content.css";

export const Content = observer(() => {

  return <div className="Content">
    <Gate/><Gate/><Gate/><Gate/><Gate/><Gate/><Gate/><Gate/><Gate/>
  </div>;
});


export const Gate = observer(() => {
  
  return <Card interactive={true} elevation={Elevation.TWO}>
    <header>A</header>
    <Button text={store.counter} onClick={store.riseCounter} />
  </Card>;
});
