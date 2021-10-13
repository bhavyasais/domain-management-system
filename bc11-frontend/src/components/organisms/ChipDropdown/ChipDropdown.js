import { Typography, withStyles } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Chip from '../../atoms/Chip/Chip';
import { TRUSTGROUP_COLORS, RELATIONSHIP_COLORS } from '../../../utils/Strings';

const styles = () => ({
  DropDownContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '8px',
    border: '1px solid #D3D3D3',
    backgroundColor: '#FFFFFF',
    marginTop: '4px',
  },
  dropDownHeader: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '8px',
    paddingBottom: '6px',
  },
  defaultStyle: {
    width: '180px',
  },
  defaultItemStyle: {
    marginBottom: '8px',
    '&:hover': {
      backgroundColor: '#f6f6f6',
    },
  },
});

const ChipDropdown = ({
  placeholder,
  list,
  listOpen,
  onDropDownChange,
  customStyle,
  placeholderStyle,
  classes,
  selectedValue,
  dropDownContainerStyle,
  itemStyle,
}) => {
  const [isOpen, setisOpen] = useState(listOpen);
  const [value, setValue] = useState(selectedValue);

  const onToggleList = () => {
    setisOpen(!isOpen);
  };

  const handleDropDownChange = useCallback(
    (index) => () => {
      setValue(list[index]?.groupName);
      onDropDownChange?.(list[index], index);
      onToggleList();
    },
    [list, onDropDownChange, onToggleList],
  );
  return (
    <div className={clsx(classes.defaultStyle, customStyle)}>
      <div className={classes.dropDownHeader} onClick={() => onToggleList?.()}>
        {value ? (
          <Chip
            label={value}
            backgroundColor={TRUSTGROUP_COLORS[value] ?? RELATIONSHIP_COLORS[value] ?? '#eeeeee'}
            color="#1c1c21"
          />
        ) : (
          <Typography className={placeholderStyle}>{placeholder}</Typography>
        )}
        <KeyboardArrowDownIcon className={classes.menuIcon} />
      </div>
      {isOpen && (
        <div className={clsx(classes.DropDownContainer, dropDownContainerStyle)}>
          {list?.map((item, index) => (
            <div
              onClick={handleDropDownChange(index)}
              key={index}
              className={clsx(classes.defaultItemStyle, itemStyle)}
            >
              <Chip
                label={item?.groupName}
                backgroundColor={
                  TRUSTGROUP_COLORS[item?.groupName] ??
                  RELATIONSHIP_COLORS[item?.groupName] ??
                  '#eeeeee'
                }
                color="#1c1c21"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ChipDropdown.propTypes = {
  placeholder: PropTypes.string,
  selectedValue: PropTypes.string,
};
ChipDropdown.defaultProps = {
  placeholder: 'Find an option',
  selectedValue: null,
  placeholderStyle: null,
  customStyle: null,
  dropDownContainerStyle: null,
  listOpen: false,
};

export default withStyles(styles)(ChipDropdown);
