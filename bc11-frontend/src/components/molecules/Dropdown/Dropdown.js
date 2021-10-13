import { FormControl, MenuItem, Select, withStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  dropdown: {
    height: '38px',
  },
});

const Dropdown = ({ classes, onChange, selectedItem, list, containerStyle, dropDownStyle }) => {
  const handleChange = (event) => {
    onChange?.(event?.target?.value);
  };
  return (
    <div className={containerStyle}>
      <FormControl variant="outlined" className={clsx(classes.formControl, dropDownStyle)}>
        <Select
          value={selectedItem?.value}
          onChange={handleChange}
          labelId="simple-select-label"
          id="simple-select"
          displayEmpty
          className={classes.dropdown}
        >
          <MenuItem value="">None</MenuItem>
          {list.map((item) => (
            <MenuItem value={item?.value} key>
              {item?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

Dropdown.propTypes = {
  onChange: PropTypes.func,
  selectedItem: PropTypes.shape({
    value: PropTypes.string,
    name: PropTypes.string,
  }),
  list: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  containerStyle: PropTypes.shape,
};
Dropdown.defaultProps = {
  onChange: null,
  selectedItem: {
    value: '',
    name: '',
  },
  list: [],
  containerStyle: null,
};

export default withStyles(styles)(Dropdown);
