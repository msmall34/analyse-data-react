import React from "react";
import { compose } from "redux";
import { withDateMin } from "../enhancers/withDateMin";
import { withDateMax } from "../enhancers/withDateMax";
import { withParam } from "../enhancers/withParam";
import { withResult } from "../enhancers/withResult";
import { Results } from "../components/results";

//const buttonStyles = { display: "flex", flex: 1, justifyContent: "flex-end" };

const PureSwitchResults = ({ param, dateMin, dateMax }) => (
  <section>
    {param && param.length && dateMin && dateMin.length && dateMax && dateMax.length ? (
      <Results />
    ) : (
      <div>empty</div>
    )}
  </section>
);

export const SwitchResults = compose(withParam, withDateMin, withDateMax)(PureSwitchResults);

