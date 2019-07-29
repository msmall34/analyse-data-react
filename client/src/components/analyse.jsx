import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { connect } from "react-redux";
import { ButtonAnalyse } from "./button";
import * as Utils from "../utils";
import { setParam } from "../redux/actions";
import { setDateMin } from "../redux/actions";
import { setDateMax } from "../redux/actions";

const buttonStyles = { width: "90%", margin: "20px auto" };

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const createError = message => ({ error: true, message });

class PureAnalyse extends Component {
  state = {
    param: "",
    dateMin: "",
    dateMax: "",
    data: [],
    dateMaxList: [],
    loading: false
  };
  async componentDidMount() {
    fetch("http://localhost:5000/api/getList")
      .then(res => res.json())
      .then(
        (obj) => {
          this.setState({
            data: obj,
            dateMaxList: obj,
          });
        },
        (error) => {
          console.log('error on Analyse componentDidMount');
          createError(error.message);
        }
      )
  }
  classes = () => {
    return useStyles();
  }
  handleParamChange = param => event => {
    this.setState({
      param: event.target.value
    });
  };
  handleDateMinChange = dateMin => event => {
    this.setState({
      dateMin: event.target.value
    });
    setTimeout(() => {
      const data = this.state.data;
      const dateMin = this.state.dateMin;
      const dateMaxListUpdated = Utils.compareDates(data, dateMin);
      console.log('this.state handleDateMinChange', this.state);
      this.setState({
        dateMaxList: dateMaxListUpdated
      });
    }, 100);
  };
  handleDateMaxChange = dateMax => event => {
    this.setState({
      dateMax: event.target.value
    });
  };
  search = async () => {
    const { dispatchParam } = this.props;
    const { dispatchDateMin } = this.props;
    const { dispatchDateMax } = this.props;
    const { param } = this.state;
    const { dateMin } = this.state;
    const { dateMax } = this.state;
    this.setState({ loading: true });

    if (param && dateMin && dateMax) {
      setTimeout(() => {
        this.setState({ loading: false });
        dispatchParam(param);
        dispatchDateMin(dateMin);
        dispatchDateMax(dateMax);
        console.log('this.state search', this.state);
      }, 100);
    } else {
      // TODO: handle error
      console.log('error in search');
    }
  };
  get loadingButton() {
    const { loading } = this.state;
    return loading ? (
      <CircularProgress color="secondary" size={25} />
    ) : (
      <ButtonAnalyse style={buttonStyles} onPress={this.search}>
        Lancer l'analyse
      </ButtonAnalyse>
    );
  }
  render() {
    const { param } = this.state;
    const { dateMin } = this.state;
    const { dateMax } = this.state;
    return (
      <section className="analyse">

        <FormControl className={this.classes.formControl}>
        <FormHelperText>Parametres</FormHelperText>
        <Select
          value={param}
          onChange={this.handleParamChange("param")}
          inputProps={{
            name: 'param',
            id: 'param',
          }}
        >
          <MenuItem value='files'>number of files</MenuItem>
          <MenuItem value='inodes'>number of inodes</MenuItem>
          <MenuItem value='recv'>bytes received (bytes)</MenuItem>
          <MenuItem value='send'>bytes sended (bytes)</MenuItem>
          <MenuItem value='used'>used (bytes)</MenuItem>
          <MenuItem value='buff'>buff (bytes)</MenuItem>
          <MenuItem value='cach'>cach (bytes)</MenuItem>
          <MenuItem value='free'>free (bytes)</MenuItem>
          <MenuItem value='usr'>usr (percentage)</MenuItem>
          <MenuItem value='sys'>sys (percentage)</MenuItem>
          <MenuItem value='sys'>sys (percentage)</MenuItem>
          <MenuItem value='wai'>wai (percentage)</MenuItem>
          <MenuItem value='hiq'>hiq (percentage)</MenuItem>
          <MenuItem value='siq'>siq (percentage)</MenuItem>
          <MenuItem value='read'>read bytes on disk</MenuItem>
          <MenuItem value='writ'>write bytes on disk</MenuItem>
          <MenuItem value='1m'>load average for last minute</MenuItem>
          <MenuItem value='5m'>load average for last 5 minutes</MenuItem>
          <MenuItem value='15m'>load average for last 15 minutes</MenuItem>
        </Select>
        </FormControl>

        <FormControl className={this.classes.formControl}>
        <FormHelperText>Du :</FormHelperText>
          <Select
            value={dateMin}
            onChange={this.handleDateMinChange("dateMin")}
            inputProps={{
              name: 'dateMin',
              id: 'dateMin',
            }}
          >
            {this.state.data.map((obj, i) => {
              return <MenuItem key={i} value={obj.time}>{obj.time}</MenuItem>
            })}

          </Select>
        </FormControl>

        <FormControl className={this.classes.formControl}>
        <FormHelperText>Au :</FormHelperText>
          <Select
            value={dateMax}
            onChange={this.handleDateMaxChange("dateMax")}
            inputProps={{
              name: 'dateMax',
              id: 'dateMax',
            }}
          >
            {this.state.dateMaxList.map((dateMax, i) => {
              return <MenuItem key={i} value={dateMax.time}>{dateMax.time}</MenuItem>
            })}

          </Select>
        </FormControl>

        {this.loadingButton}
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchParam: param => dispatch(setParam(param)),
  dispatchDateMin: dateMin => dispatch(setDateMin(dateMin)),
  dispatchDateMax: dateMax => dispatch(setDateMax(dateMax))
});
export const Analyse = connect(
  null,
  mapDispatchToProps
)(PureAnalyse);
