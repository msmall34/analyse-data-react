import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { connect } from "react-redux";
import { Header } from "./header";
import { ButtonAnalyse } from "./button";
import { filterParams } from "../model";
import * as Utils from "../utils";
import { setParam } from "../redux/actions";
import { setDateMin } from "../redux/actions";
import { setDateMax } from "../redux/actions";

const buttonStyles = { width: "25%" };

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
            dateMaxList: obj
          });
        },
        (error) => {
          console.log('error on Analyse componentDidMounto')
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
      //const dateMaxListUpdated = Utils.compareDates(data, dateMin);
      const dateMaxListUpdated = data;
      console.log('this.state', this.state);
      console.log('data', data);
      console.log('dateMin', dateMin);
      console.log('dateMaxListUpdated', dateMaxListUpdated);
      this.setState({
        dateMaxList: dateMaxListUpdated
      });
    }, 100);
  };
  handleDateMaxChange = dateMax => event => {
    this.setState({
      dateMax: event.target.value
    });
    setTimeout(() => {
      const data = this.state.data;
      const dateMin = this.state.dateMin;
      //const dateMaxListUpdated = Utils.compareDates(data, dateMin);
      const dateMaxListUpdated = data;
      console.log('this.state', this.state);
      console.log('data', data);
      console.log('dateMin', dateMin);
    }, 100);
  };
  search = async () => {
    const { dispatchParam } = this.props;
    const { dispatchDateMin } = this.props;
    const { dispatchDateMax } = this.props;
    const { param } = this.state;
    const { dateMin } = this.state;
    const { dateMax } = this.state;
    this.setState({ loading: true });
    //const filtered = await filterParams(param, dateMin, dateMax);
    const dispatchAll = () => {
      () => dispatchParam(param);
      () => dispatchDateMin(dateMin);
      () => dispatchDateMax(dateMax);
    };
    // if (filtered.error) {
      // TODO: handle error
    // } else {
      this.setState({ loading: false }, () => dispatchAll());
    // }
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
      <main>
        <Header>Analyse des informations systèmes</Header>
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
            value={this.state.dateMin}
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
      </main>
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
