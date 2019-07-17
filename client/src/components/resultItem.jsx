import React from "react";
import PropTypes from "prop-types";


export const ResultItem = ({ item }) => (
  <div>
	  <span>Le </span>
	  <span>{this.props.param} </span>
	  <span>au </span>
	  <span>{item.time} </span>
	  <span>était de: </span>
	  <span>{item[this.props.param]}</span>
	</div>
);
ResultItem.propTypes = {
  item: PropTypes.object.isRequired,
};
