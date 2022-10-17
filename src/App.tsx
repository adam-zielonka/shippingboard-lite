import "./App.css";
import { observer } from "mobx-react-lite";
import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { LoadingDialog } from "./components/LoadingDialog";

function App() {
  return (
    <div className="App">
      <Header/>
      <Content/>
      <LoadingDialog/>
    </div>
  );
}

export default observer(App);
