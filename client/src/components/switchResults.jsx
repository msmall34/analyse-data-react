import React from "react";
import { compose } from "redux";
import { withDateMin } from "../enhancers/withDateMin";
import { withDateMax } from "../enhancers/withDateMax";
import { withParam } from "../enhancers/withParam";
import { Results } from "../components/results";


const PureSwitchResults = ({ param, dateMin, dateMax }) => (
  <section className="results">
    {param && param.length && dateMin && dateMin.length && dateMax && dateMax.length ? (
      <Results />
    ) : (
      <div className="EmptyResults">Please select the parameter and date range you wish to analyze</div>
    )}
  </section>
);

export const SwitchResults = compose(withParam, withDateMin, withDateMax)(PureSwitchResults);

