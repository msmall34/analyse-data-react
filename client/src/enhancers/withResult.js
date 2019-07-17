import { connect } from "react-redux";
import { setResults } from "../redux/actions";

const mapStateToProps = state => ({
  results: state.results.results
});
const mapDispatchToProps = dispatch => ({
  dispatchResults: results => dispatch(setResults(results))
});

export const withResult = connect(
  mapStateToProps,
  mapDispatchToProps
);
