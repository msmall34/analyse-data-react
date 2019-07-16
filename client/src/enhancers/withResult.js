import { connect } from "react-redux";
import { setResults } from "../redux/actions";

const mapStateToProps = state => ({
  result: state.results.result,
});
const mapDispatchToProps = dispatch => ({
  dispatchParam: result => dispatch(setResults(result))
});

export const withResult = connect(
  mapStateToProps,
  mapDispatchToProps
);
