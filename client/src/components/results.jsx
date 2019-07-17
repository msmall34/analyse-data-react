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
import * as storage from "../storageHelper";

const createError = message => ({ error: true, message });

class PureResults extends Component {
  state = {
    results: storage.getItem("results", storage.NAMESPACES.Results) || []
  };
  // state = {
  //   results: []
  // };
  checkParam = (results, inputs) => {
    return results.filter(el => {
      // el.toLowerCase().indexOf(requete.toLowerCase()) !== -1

      const dateMinSelected = inputs ? inputs[0] : ''; // "16-03 10:08:28"
      const dateMinSelectedParts = dateMinSelected ? dateMinSelected.split(' ') : '';
      const dateMinHours = dateMinSelectedParts ? dateMinSelectedParts[1] : ''; // "10:08:28"
      const dateMinHoursParts = dateMinHours ? dateMinHours.split(':') : '';
      const minutesInDateMin = dateMinHoursParts ? Number(dateMinHoursParts[1]) : '';
      // const dateMinNumb = strToDate(inputs[0]).getHours();


      const date = el ? el.time : ''; // "16-03 10:08:28"
      const dateParts = date ? date.split(' ') : '';
      const dateHours = dateParts ? dateParts[1] : ''; // "10:08:28"
      const dateHoursParts = dateHours ? dateHours.split(':') : '';
      const minutesIndate = dateHoursParts ? Number(dateHoursParts[1]) : '';
      //const date = strToDate(el.time).getHours();


      const dateMaxSelected = inputs ? inputs[1] : '' ; // "16-03 10:08:28"
      const dateMaxSelectedParts = dateMaxSelected ? dateMaxSelected.split(' ') : '';
      const dateMaxHours = dateMaxSelectedParts ? dateMaxSelectedParts[1] : ''; // "10:08:28"
      const dateMaxHoursParts = dateMaxHours ? dateMaxHours.split(':') : '';
      const minutesInDateMax = dateMaxHoursParts ? Number(dateMaxHoursParts[1]) : '';
      //const dateMaxNumb = strToDate(inputs[1]).getHours();

      if ((minutesInDateMax >= minutesIndate) && (minutesIndate <= minutesInDateMin)) {
        return el;
      } else {
        // elementsInvalides ++;
        // console.log('elementsInvalides', elementsInvalides);
        return false;
      }

    });
  }
  filterResults = async (dateMin, dateMax, results)  => {
  
    const inputs = [dateMin, dateMax];
    const filteredResults = this.checkParam(results, inputs);
    // console.log('analyseGetResults in analyse', filteredResults);
    // return filteredResults;
    this.setState({
      dateMin: dateMin,
      dateMax: dateMax,
      results: filteredResults
    });
  };
  async componentDidMount() {
    const { param } = this.props;
    const { dateMin } = this.props;
    const { dateMax } = this.props;
    const { results } = this.props;

    setTimeout(() => {
    if (param, dateMin, dateMax) {
      const fiterresults = this.filterResults(dateMin, dateMax, results);
      if (param && dateMin && fiterresults) {
        this.setState({ results: results });
        storage.setItem("results", results, storage.NAMESPACES.Result);
      } else {
        // TODO: handle error
        console.log('error in results');
      }
    }
    }, 100);
  }
  async componentDidUpdate({ param: prevParam }) {
    const { param } = this.props;
    const { dateMin } = this.props;
    const { dateMax } = this.props;
    const { results } = this.props;

    //setTimeout(() => {
    if (param, dateMin, dateMax) {
      // const fiterresults = this.filterResults(dateMin, dateMax, results);
      this.filterResults(dateMin, dateMax, results);
      if (param && dateMin && dateMax) {
        // this.setState({ results: results });
        storage.setItem("results", results, storage.NAMESPACES.Result);
      } else {
        // TODO: handle error
        console.log('error in results');
      }
    }
    // }, 100);
  }
  render() {
    const { param } = this.state;
    const { dateMin } = this.state;
    const { dateMax } = this.state;
    const { results } = this.state;
    console.log('param', param);
    console.log('dateMin', dateMin);
    console.log('dateMax', dateMax);
    console.log('results', results);
    return (
      <List>
        {results.map((item, i, arr) => {
          return (
            <div>
              <span>Le </span>
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

