import { Alignment, Button, Navbar } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import "./App.css";
import { store } from "./store/Store";

function App() {
  return (
    <div className="App">
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>ShippingBoard Light</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp4-minimal" icon="dashboard" text="Dashboard" />
          <Button className="bp4-minimal" icon="th" text="List" />
        </Navbar.Group>
      </Navbar>
      <div className="content">
        <Button text={store.counter} onClick={store.riseCounter} />
      </div>
    </div>
  );
}

export default observer(App);
