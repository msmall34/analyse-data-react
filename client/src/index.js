import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Header } from "./components/header";
import { Analyse } from "./components/analyse";
import { SwitchResults } from "./components/switchResults";
import { store } from "./redux/store";

import "./index.css";

const App = () => (
  <Provider store={store}>
    <main id="analyse-system" className="App">
      <Header>Analyse des informations systèmes</Header>
      <div className="container">
        <Analyse />
        <SwitchResults />
      </div>
    </main>
  </Provider>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
