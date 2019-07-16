import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Analyse } from "./components/analyse";
// import { Averages } from "./components/averages";
import { SwitchResults } from "./components/switchResults";
import { store } from "./redux/store";

import "./index.css";

const App = () => (
  <Provider store={store}>
    <main id="analyse-system" className="App">
      <Analyse />
      <SwitchResults />
    </main>
  </Provider>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
