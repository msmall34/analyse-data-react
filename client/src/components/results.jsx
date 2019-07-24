import React, { Component } from "react";
import List from "@material-ui/core/List";
import { compose } from "redux";
// import { ResultItem } from "./resultItem";
import { withDateMin } from "../enhancers/withDateMin";
import { withDateMax } from "../enhancers/withDateMax";
import { withParam } from "../enhancers/withParam";
import { withResult } from "../enhancers/withResult";
// import { setParam } from "../redux/actions";
// import { setDateMin } from "../redux/actions";
// import { setDateMax } from "../redux/actions";
// import { setResults } from "../redux/actions";
import * as Utils from "../utils";
//import * as storage from "../storageHelper";
//
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const createError = message => ({ error: true, message });

const useStyles = makeStyles(theme => ({
  root: {
    width: '450px',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

class PureResults extends Component {
  state = {
    results: []
  };
  classes = () => {
    return useStyles();
  }
  getResults = async (dateMin, dateMax)  => {
    fetch("http://localhost:5000/api/getList")
    .then(res => res.json())
    .then(
      (results) => {
        const inputs = [dateMin, dateMax];
        const filteredResults = Utils.filterResults(results, inputs);
        console.log('filteredResults', filteredResults);
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
    // return (
    //   <List>
    //     {results.map((item, i, arr) => {
    //       return (
    //         <div key={i}>
    //           <span>{this.props.param} </span>
    //           <span>au </span>
    //           <span>{item.time} </span>
    //           <span>était de: </span>
    //           <span>{item[this.props.param]}</span>
    //         </div>
    //       );
    //     })}
    //   </List>
    // );


    return (
      <Paper className={this.classes.root}>
        <Table className={this.classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Parametres</TableCell>
              <TableCell >Dates</TableCell>
              <TableCell >Valeurs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((item, i, arr) => (
              <TableRow key={i}>
                {/*<TableCell component="th" scope="row">{this.props.param}</TableCell>*/}
                <TableCell >{this.props.param}</TableCell>
                <TableCell >{item.time}</TableCell>
                <TableCell >{item[this.props.param]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );

  }
}

export const Results = compose(withParam, withDateMin, withDateMax, withResult)(PureResults);

