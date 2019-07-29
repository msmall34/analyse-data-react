import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { withParam } from "../enhancers/withParam";
import { withResult } from "../enhancers/withResult";
import { setResults } from "../redux/actions";
import * as Utils from "../utils";

class PureAverages extends Component {
  state = {
    average: 0,
    minVal: '',
    maxVal: '',
  };

  calculAverage = (arr) => {
    const { param } = this.props;
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

  getAverage = (results) => {
    (results) => {
      const average = this.calculAverage(results);
      console.log('average', average);
      this.setState({
        average: average
      });
    }
  }

  async componentDidMount() {
    const { results } = this.props;

    if (results) {
      this.calculAverage(results);
    } else {
      // TODO: handle error
      console.log('error in results');
    }
  };

  async componentDidUpdate({ results: prevResults }) {
    const { results } = this.props;


    if (prevResults !== results) {
      if (results) {
        this.calculAverage(results);
      } else {
        // TODO: handle error
        console.log('error in results');
      }
    }
  };

  render() {
    const { average } = this.state;

    return (
      <div className="calculs">

        <div className="moyenne calculItem">
          <div className="moyenneValue">{ average }</div>
          <div className="moyenneLabel">Moyenne du nombre de "Files" entre le <br/> 16-03 10:11:28 et le 16-03 10:15:28</div>
        </div>

        <div className="minValeur calculItem">
          <div className="minVal">{ average }</div>
          <div className="minValLabel"><span>Valeur minimum au <br/> 16-03 10:11:28</span></div>
        </div>

        <div className="maxValeur calculItem">
          <div className="maxVal">{ average }</div>
          <div className="maxValLabel">Valeur minimum au <br/> 16-03 10:15:28</div>
        </div>

      </div>

    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   dispatchResults: results => dispatch(setResults(results))
// });
// export const Averages = connect(
//   null,
//   mapDispatchToProps
// )(PureAverages);

export const Averages = compose(withParam, withResult)(PureAverages);
