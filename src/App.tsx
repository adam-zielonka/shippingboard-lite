import "./App.scss";
import { observer } from "mobx-react-lite";
import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { Details } from "./components/Details";

function App() {
  return (
    <div className="App">
      <Header/>
      <Content/>
      <Details/>
    </div>
  );
}

export default observer(App);
