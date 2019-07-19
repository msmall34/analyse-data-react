import React, { Component } from "react";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import { compose } from "redux";
import { ResultItem } from "./resultItem";
import { getResults } from "../model";
// import { getParams } from "../model";
// import { getDatesMin } from "../model";
// import { getDatesMax } from "../model";
// import { paramItem } from "./paramItem";
import { withDateMin } from "../enhancers/withDateMin";
import { withDateMax } from "../enhancers/withDateMax";
import { withParam } from "../enhancers/withParam";
import { withResult } from "../enhancers/withResult";
import { setParam } from "../redux/actions";
import { setDateMin } from "../redux/actions";
import { setDateMax } from "../redux/actions";
import { setResults } from "../redux/actions";
import * as Utils from "../utils";
import * as storage from "../storageHelper";

const createError = message => ({ error: true, message });

class PureResults extends Component {
  state = {
    results: []
  };
  filterResults = (results, inputs) => {
    return results.filter(el => {

      const dateMinSelected = inputs ? inputs[0] : ''; // "16-03 10:08:28"
      const dateMinSelectedParts = dateMinSelected ? dateMinSelected.split(' ') : '';
      const dateMinHours = dateMinSelectedParts ? dateMinSelectedParts[1] : ''; // "10:08:28"
      const dateMinHoursParts = dateMinHours ? dateMinHours.split(':') : '';
      const hoursInDateMin = dateMinHoursParts ? Number(dateMinHoursParts[0]) : '';
      const minutesInDateMin = dateMinHoursParts ? Number(dateMinHoursParts[1]) : '';

      const date = el ? el.time : ''; // "16-03 10:08:28"
      const dateParts = date ? date.split(' ') : '';
      const dateHours = dateParts ? dateParts[1] : ''; // "10:08:28"
      const dateHoursParts = dateHours ? dateHours.split(':') : '';
      const hoursIndate = dateHoursParts ? Number(dateHoursParts[0]) : '';
      const minutesIndate = dateHoursParts ? Number(dateHoursParts[1]) : '';

      const dateMaxSelected = inputs ? inputs[1] : '' ; // "16-03 10:08:28"
      const dateMaxSelectedParts = dateMaxSelected ? dateMaxSelected.split(' ') : '';
      const dateMaxHours = dateMaxSelectedParts ? dateMaxSelectedParts[1] : ''; // "10:08:28"
      const dateMaxHoursParts = dateMaxHours ? dateMaxHours.split(':') : '';
      const hoursInDateMax = dateMaxHoursParts ? Number(dateMaxHoursParts[0]) : '';
      const minutesInDateMax = dateMaxHoursParts ? Number(dateMaxHoursParts[1]) : '';

      if (((minutesInDateMax >= minutesIndate) && (minutesIndate >= minutesInDateMin))
        && ((hoursInDateMax >= hoursIndate) && (hoursIndate >= hoursInDateMin))) {
        return el;
      } else {
        return false;
      }

    });
  }
  getResults = async (dateMin, dateMax)  => {
    fetch("http://localhost:5000/api/getList")
    .then(res => res.json())
    .then(
      (results) => {
        const inputs = [dateMin, dateMax];
        const filteredResults = this.filterResults(results, inputs);
        this.setState({
          results: filteredResults
        });
      },
      (error) => {
        console.log('error on getResults');
        createError(error.message);
      }
    )
  };
  async componentDidMount() {
    const { param } = this.props;
    const { dateMin } = this.props;
    const { dateMax } = this.props;
    if (param && dateMin && dateMax) {
      this.getResults(dateMin, dateMax);
    } else {
      // TODO: handle error
      console.log('error in results');
    }
  }
  async componentDidUpdate({ param: prevParam, dateMin: prevDateMin, dateMax: prevDateMax }) {
    const { param } = this.props;
    const { dateMin } = this.props;
    const { dateMax } = this.props;

    if (prevParam !== param || prevDateMin !== dateMin || prevDateMax !== dateMax) {
      if (param && dateMin && dateMax) {
        this.getResults(dateMin, dateMax);
      } else {
        // TODO: handle error
        console.log('error in results');
      }
    }
  }
  render() {
    const { results } = this.state;
    return (
      <List>
        {results.map((item, i, arr) => {
          return (
            <div key={i}>
              <span>{this.props.param} </span>
              <span>au </span>
              <span>{item.time} </span>
              <span>était de: </span>
              <span>{item[this.props.param]}</span>
            </div>
          );
        })}
      </List>
    );
  }
}

export const Results = compose(withParam, withDateMin, withDateMax, withResult)(PureResults);

