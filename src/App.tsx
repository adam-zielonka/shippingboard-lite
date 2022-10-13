import { Button } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import "./App.css";
import { store } from "./store/Store";

function App() {
  return (
    <div className="App">
      <div>
        <Button text={store.counter} onClick={store.riseCounter} />
      </div>
    </div>
  );
}

export default observer(App);
