import { connect } from "react-redux";
import { setResults } from "../redux/actions";

const mapStateToProps = state => ({
  results: state.results.results
});
const mapDispatchToProps = dispatch => ({
  dispatchResults: param => dispatch(setResults(param))
});

export const withResult = connect(
  mapStateToProps,
  mapDispatchToProps
);
