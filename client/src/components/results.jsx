import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import { withDateMin } from "../enhancers/withDateMin";
import { withDateMax } from "../enhancers/withDateMax";
import { withParam } from "../enhancers/withParam";
import { withResult } from "../enhancers/withResult";
import { setParam } from "../redux/actions";
import { setDateMin } from "../redux/actions";
import { setDateMax } from "../redux/actions";
import { setResults } from "../redux/actions";
import * as Utils from "../utils";



const createError = message => ({ error: true, message });

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
}));

const useStyles2 = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

function TablePaginationActions(props) {
  const classes1 = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes1.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

class PureResults extends Component {
  state = {
    results: [],
    page: 0,
    rowsPerPage: 5,
  };

  classes2 = () => {
    return useStyles2();
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  getResults = async (dateMin, dateMax)  => {
    fetch("http://localhost:5000/api/getList")
    .then(res => res.json())
    .then(
      (results) => {
        const { dispatchResults } = this.props;
        const inputs = [dateMin, dateMax];
        const filteredResults = Utils.filterResults(results, inputs);
        console.log('filteredResults', filteredResults);
        this.setState({
          results: filteredResults
        });
        dispatchResults(filteredResults);
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
    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, results.length - this.state.page * this.state.rowsPerPage);

    return (
      <Paper className={this.classes2.root}>
      <div className={this.classes2.tableWrapper}>
        <Table className={this.classes2.table}>
        <TableHead>
            <TableRow>
              <TableCell>Parametres</TableCell>
              <TableCell align="right">Dates</TableCell>
              <TableCell align="right">Valeurs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((item, i, arr) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {this.props.param}
                </TableCell>
                <TableCell align="right">{item.time}</TableCell>
                <TableCell align="right">{item[this.props.param]}</TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={results.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                SelectProps={{
                  inputProps: { 'aria-label': 'results per page' },
                  native: true,
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>

    );

  }
}

// const mapDispatchToProps = dispatch => ({
//   dispatchParam: param => dispatch(setParam(param)),
//   dispatchDateMin: dateMin => dispatch(setDateMin(dateMin)),
//   dispatchDateMax: dateMax => dispatch(setDateMax(dateMax)),
//   dispatchResults: results => dispatch(setResults(results))
// });
// export const Results = connect(
//   null,
//   mapDispatchToProps
// )(PureResults);

export const Results = compose(withParam, withDateMin, withDateMax, withResult)(PureResults);

