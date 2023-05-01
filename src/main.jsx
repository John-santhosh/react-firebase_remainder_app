import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { GlobalAppContext } from "./Context";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <GlobalAppContext>
    <App />
  </GlobalAppContext>
  // </React.StrictMode>,
);
