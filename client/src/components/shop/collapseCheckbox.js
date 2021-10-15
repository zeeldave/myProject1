import React, { useState } from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  Collapse,
  Button,
} from "@material-ui/core";

const CollapseCheckBox = (props) => {
  const [open, setOpen] = useState(props.initState);
  const [checked, setChecked] = useState([]);

  const handleCollapseOpen = () => {
    setOpen(!open);
  };

  const unChecked = () => {
    setChecked([]);
    props.unChecked();
  };

  const renderList = () =>
    props.list
      ? props.list.map((value) => (
          <ListItem key={value._id}>
            <ListItemText primary={value.name} />
            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                onChange={() => handleChange(value._id)}
                checked={checked.indexOf(value._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;

  const handleChange = (id) => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  return (
    <div className="collapse_items_wrapper">
      <List>
        <ListItem onClick={handleCollapseOpen}>
          <ListItemText primary={props.title} className="collapse_title" />
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </ListItem>

        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {renderList()}
          </List>
          {checked.length > 0 ? (
            <Button onClick={unChecked} variant="outlined">
              Clear
            </Button>
          ) : null}
        </Collapse>
      </List>
    </div>
  );
};

export default CollapseCheckBox;
