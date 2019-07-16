import React, { Fragment } from "react";
import { compose } from "redux";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { withDateMin } from "../enhancers/withDateMin";
import { withDateMax } from "../enhancers/withDateMax";
import { withParam } from "../enhancers/withParam";
import { withResult } from "../enhancers/withResult";
import { Results } from "../components/results";

const buttonStyles = { display: "flex", flex: 1, justifyContent: "flex-end" };

const PureSwitchResults = ({ result, param, dateMin, dateMax }) => (
  <section>
    {result ? (
      <Results />
    ) : (
      <div>empty</div>
    )}
  </section>
);

export const SwitchResults = compose(withParam, withDateMin, withDateMin)(PureSwitchResults);

