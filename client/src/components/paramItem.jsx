import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";

export const TPRepositoryItem = ({ item, selectParam }) => (
  <ListItem button onClick={selectParam(item)}>
    <ListItemIcon>
      <InboxIcon />
    </ListItemIcon>
    <ListItemText primary={item.name} />
  </ListItem>
);
TPRepositoryItem.propTypes = {
  item: PropTypes.object.isRequired,
  selectParam: PropTypes.func.isRequired
};
