import React, { Component } from "react";
import List from "@material-ui/core/List";
import { compose } from "redux";
import { getResults } from "../model";
// import { getParams } from "../model";
// import { getDatesMin } from "../model";
// import { getDatesMax } from "../model";
// import { paramItem } from "./paramItem";
import { withParam } from "../enhancers/withParam";
import { withDateMin } from "../enhancers/withDateMin";
import { withDateMax } from "../enhancers/withDateMax";
import * as storage from "../storageHelper";

class PureResults extends Component {
  state = {
    results: storage.getItem("results", storage.NAMESPACES.Result) || []
  };
  async componentDidMount() {
    const { param } = this.props;
    const { dateMin } = this.props;
    const { dateMax } = this.props;

    // setTimeout(() => {
    //if (prevParam !== param) {
      const results = getResults(dateMin, dateMax);
      if (results.error) {
        // TODO: handle error
        console.log('error in results');
      } else {
        this.setState({ results });
        // storage.setItem("repos", repositories, storage.NAMESPACES.Repo);
        storage.setItem("results", results, storage.NAMESPACES.Result);
      }
    //}
    // }, 100);
  }
  async componentDidUpdate({ param: prevParam }) {
    const { param } = this.props;
    const { dateMin } = this.props;
    const { dateMax } = this.props;
    // if (prevParam !== param) {
      const results = await getResults(dateMin, dateMax);
      if (results.error) {
        // TODO: handle error
        console.log('error in results');
      } else {
        this.setState({ results });
        storage.setItem("results", results, storage.NAMESPACES.Result);
      }
    // }
  }
  render() {
    console.log('results', this.state);
    const { results } = this.state;
     console.log('results', results);
    return (
      <List>
        {results.map(item => {
          return (
            <div>

              <div>
                <span>Au {item.time} : </span>
                <span>{item[this.props]}</span>
              </div>

            </div>
          );
        })}
      </List>
    );
  }
}

export const Results = compose(withParam, withDateMin, withDateMax)(PureResults);
