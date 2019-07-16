import { connect } from "react-redux";
import { setDateMax } from "../redux/actions";

const mapStateToProps = state => ({
  dateMax: state.dateMax.dateMax
});
const mapDispatchToProps = dispatch => ({
  dispatchDateMax: dateMax => dispatch(setDateMax(dateMax)),
});

export const withDateMax = connect(
  mapStateToProps,
  mapDispatchToProps
);
