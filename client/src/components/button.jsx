import React from "react";
import Button from "@material-ui/core/Button";

export const ButtonAnalyse = ({ children, color, onPress, ...props }) => (
  <Button variant="contained" color={color} onClick={onPress} {...props}>
    {children}
  </Button>
);
ButtonAnalyse.defaultProps = {
  color: "primary"
};
