import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { withDateMin } from "../enhancers/withDateMin";
import { withDateMax } from "../enhancers/withDateMax";
import { withParam } from "../enhancers/withParam";
import { withResult } from "../enhancers/withResult";
import * as Utils from "../utils";

class PureAverages extends Component {
  state = {
    average: 0,
    minVal: '',
    minValDate: '',
    maxVal: '',
    maxValDate: '',
  };

  calculAverage = (arr) => {
    const { param } = this.props;
    const { dateMin } = this.props;
    const { dateMax } = this.props;
    let sum, avg = 0;
    let values = [];
    for (var i = 0; i <= arr.length; i++) {
      if(arr[i]) {
        values.push(arr[i][param]);
      }
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    if(values.length) {
      sum = values.reduce(reducer);
      avg = Math.floor(sum / values.length);
      this.setState({
        average: avg
      });
    }
  }

  calculMinValue = (arr) => {
    const { param } = this.props;
    let minValue = 0;
    let minValueDate = '';
    let arrayOfObjs = [];
    let valuesArray = [];
    let minValueObj = {};
    for (var i = 0; i <= arr.length; i++) {
      if(arr[i]) {
        arrayOfObjs.push({value: arr[i][param], date:arr[i]['time'] });
      }
    }
    if(arrayOfObjs.length) {
      for (var i = 0; i <= arrayOfObjs.length; i++) {
        if(arrayOfObjs[i]) {
          valuesArray.push(arrayOfObjs[i]['value']);
        }
      }
      minValue = Math.min(...valuesArray);
      minValueObj = arrayOfObjs.find(obj => obj.value === minValue);
      minValueDate = minValueObj.date;
      this.setState({
        minVal: minValue,
        minValDate: minValueDate
      });
    }
  }

  calculMaxValue = (arr) => {
    const { param } = this.props;
    let maxValue = 0;
    let maxValueDate = '';
    let arrayOfObjs = [];
    let valuesArray = [];
    let maxValueObj = {};
    for (var i = 0; i <= arr.length; i++) {
      if(arr[i]) {
        arrayOfObjs.push({value: arr[i][param], date:arr[i]['time'] });
      }
    }
    if(arrayOfObjs.length) {
      for (var i = 0; i <= arrayOfObjs.length; i++) {
        if(arrayOfObjs[i]) {
          valuesArray.push(arrayOfObjs[i]['value']);
        }
      }
      maxValue = Math.max(...valuesArray);
      maxValueObj = arrayOfObjs.find(obj => obj.value === maxValue);
      maxValueDate = maxValueObj.date;
      this.setState({
        maxVal: maxValue,
        maxValDate: maxValueDate
      });
    }
  }

  async componentDidUpdate({ results: prevResults }) {
    const { results } = this.props;
    if (prevResults !== results) {
      if (results) {
        this.calculAverage(results);
        this.calculMinValue(results);
        this.calculMaxValue(results);
      } else {
        // TODO: handle error
        console.log('error in results');
      }
    }
  };

  render() {
    const { average } = this.state;
    const { minVal } = this.state;
    const { minValDate } = this.state;
    const { maxVal } = this.state;
    const { maxValDate } = this.state;

    return (
      <div className="calculs">

        <div className="moyenne calculItem">
          <div className="moyenneValue">{ average }</div>
          <div className="moyenneLabel">Nombre de "{ this.props.param }" moyen entre le <br/> { this.props.dateMin } et le { this.props.dateMax }</div>
        </div>

        <div className="minValeur calculItem">
          <div className="minVal">{ minVal }</div>
          <div className="minValLabel"><span>Valeur minimum au <br/> { minValDate }</span></div>
        </div>

        <div className="maxValeur calculItem">
          <div className="maxVal">{ maxVal }</div>
          <div className="maxValLabel">Valeur maximum au <br/> { maxValDate }</div>
        </div>

      </div>

    );
  }
}

export const Averages = compose(withParam, withDateMin, withDateMax, withResult)(PureAverages);
