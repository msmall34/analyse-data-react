import { connect } from "react-redux";
import { setDateMin } from "../redux/actions";

const mapStateToProps = state => ({
  dateMin: state.dateMin.dateMin
});
const mapDispatchToProps = dispatch => ({
  dispatchDateMin: dateMin => dispatch(setDateMin(dateMin)),
});

export const withDateMin = connect(
  mapStateToProps,
  mapDispatchToProps
);
