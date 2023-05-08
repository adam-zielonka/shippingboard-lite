import { observer } from "mobx-react-lite";
import { store } from "../store/Store";
import { LoadingsTable } from "./LoadingsTable";
import "./Content.scss";

export const Content = observer(() => {
  const { ui } = store;

  return <LoadingsTable/>;
});
