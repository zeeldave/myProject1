import React, { useState } from 'react';
import Slider from "@material-ui/core/Slider"

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
    List,
    ListItem,
    ListItemText,
    Collapse,
    Button
} from '@material-ui/core';


const RangeSelect = (props) => {
    const [open, setOpen] = useState(props.initState);

    // Our States
    const [value, setValue] = useState([0, 5000]);
  
    // Changing State when volume increases/decreases
    const rangeSelector = (event, newValue) => {
      setValue(newValue);
      props.handleRange([value[0], value[1]]);
    };
  
    const makeDefault = () => {
      setValue([0, 5000]);
      props.makeDefault([0, 5000]);
    };
  
    const handleCollapseOpen = () => {
      setOpen(!open);
    };
  
    return (
      <div>
        <div className="collapse_items_wrapper">
          <List>
            <ListItem onClick={handleCollapseOpen}>
              <ListItemText primary={props.title} className="collapse_title" />
              {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </ListItem>
          </List>
          <Collapse in={open} timeout="auto">
            <List component="div" disablePadding>
              <Slider
                min={0}
                max={5000}
                value={value}
                onChange={rangeSelector}
                valueLabelDisplay="auto"
              />
              <p>
                Range of Price is between <br />${value[0]} and ${value[1]}
              </p>
            </List>
            {value[0] !== 0 || value[1] !== 5000 ? (
              <Button onClick={makeDefault} variant="outlined">
                Clear
              </Button>
            ) : null}
          </Collapse>
        </div>
      </div>
    );
}

export default RangeSelect;