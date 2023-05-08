import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.scss";
import { FocusStyleManager } from "@blueprintjs/core";
 
FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);
