import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import store from "./store";
import "./firebase";
import "./Utils/messaging_recieve_message";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
