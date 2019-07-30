import React from "react";
import { compose } from "redux";
import { withDateMin } from "../enhancers/withDateMin";
import { withDateMax } from "../enhancers/withDateMax";
import { withParam } from "../enhancers/withParam";
import { Results } from "../components/results";
import { Averages } from "../components/averages";


const PureSwitchResults = ({ param, dateMin, dateMax }) => (
  <section className="results">
    {param && param.length && dateMin && dateMin.length && dateMax && dateMax.length ? (
      <div className="resultsContainer">
        <Results />
        <Averages />
      </div>
    ) : (
      <div className="EmptyResults">Veuillez sélectionner le paramètre et la plage horaire que vous souhaitez analiser.</div>
    )}
  </section>
);

export const SwitchResults = compose(withParam, withDateMin, withDateMax)(PureSwitchResults);

