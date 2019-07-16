import { connect } from "react-redux";
import { setParam } from "../redux/actions";

const mapStateToProps = state => ({
  param: state.param.param,
});
const mapDispatchToProps = dispatch => ({
  dispatchParam: param => dispatch(setParam(param))
});

export const withParam = connect(
  mapStateToProps,
  mapDispatchToProps
);

