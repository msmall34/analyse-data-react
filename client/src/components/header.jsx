import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = { display: "flex", justifyContent: "flex-start" };

export const Header = ({ children }) => (
  <AppBar position="static" color="default">
    <Toolbar style={styles}>
      <Typography variant="h5" color="inherit">
        {children}
      </Typography>
    </Toolbar>
  </AppBar>
);
