import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { withParam } from "../enhancers/withParam";

const PureAverages = ({ param }) => (
  <section>
    <Chip label={param.param} />
  </section>
);

export const Averages = withParam(PureAverages);
