import { Button } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { store } from "../store/Store";

export const Content = observer(() => {

  return <div className="content">
    <Button text={store.counter} onClick={store.riseCounter} />
  </div>;
});
