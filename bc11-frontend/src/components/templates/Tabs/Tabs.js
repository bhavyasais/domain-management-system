import React, { useState } from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '../../atoms/Button/ButtonAtom';
import AddNewTabTemplate from '../DialogTemplate/AddNewTabTemplate';
import Department from '../../molecules/Department/DepartmentsAdd';

const styles = () => ({
  tabs: {
    backgroundColor: '#eeeeee',
    padding: '10px 32px 10px 32px',
  },
  currentTab: {
    backgroundColor: 'white !important',
    border: '0px !important',
    zIndex: 9999,
    color: '#1c85d8 !important',
    '&:after': {
      content: 'close-quote',
      backgroundColor: 'white !important',
      display: 'inline-block',
      position: 'absolute',
      top: '0px !important',
      border: '0 !important',
    },
    '&:before': {
      content: 'close-quote',
      backgroundColor: 'white !important',
      display: 'inline-block',
      position: 'absolute',
      bottom: '0px !important',
      border: '0 !important',
    },
  },
  tabSpan: {
    display: 'inline-block',
    backgroundColor: '#eaefff',
    padding: '8px 10px 4px 20px',
    borderRadius: '5px 0px 0 0',
    color: '#333',
    border: '1px solid #cccccc',
    cursor: 'pointer',
    textAlign: 'center',
    float: 'left',
    height: '36px',
    position: 'relative',
    boxSizing: 'border-box',
    fontFamily: 'Roboto',
    fontSize: '14px',
    '&:after': {
      width: '16px',
      height: '36px',
      content: 'close-quote',
      backgroundColor: '#eaefff',
      display: 'inline-block',
      position: 'absolute',
      top: '-1px',
      left: '100%',
      border: '1px solid #cccccc',
      borderLeft: 0,
      borderRadius: '0 2px 0 0',
      transform: 'skewX(30deg)',
      boxSizing: 'border-box',
      zIndex: 999,
      borderTopRightRadius: '5px',
    },
    '&:before': {
      width: '10px',
      height: '20px',
      content: 'close-quote',
      backgroundColor: '#eaefff',
      display: 'inline-block',
      position: 'absolute',
      bottom: '-1px',
      left: '100%',
      borderRadius: ' 0 2px 0 0',
      borderBottom: '1px solid #cccccc',
      boxSizing: 'border-box',
      zIndex: 999,
    },
  },
  notFirstChild: {
    marginLeft: '18px',
  },
  button: {
    marginLeft: '24px',
    color: '#1d4cd7',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  contentContainer: {
    width: '100%',
    minHeight: '600px',
    backgroundColor: '#fafafa',
    boxShadow: '0 4px 10px 0 rgba(25, 1, 52, 0.16)',
    borderRadius: '4px',
  },
  labelStyle: {
    color: '#1d4cd7',
    textTransform: 'none',
  },
  tabHeaderContainer: {
    height: '36px',
  },
  footer: {
    width: '100%',
    height: '30px',
    backgroundColor: '#ffffff',
    bottom: 0,
    marginTop: '100px',
    color: '#666666',
    paddingLeft: '12px',
    fontFamily: 'Roboto',
  },
});

const Tabs = ({
  onChange,
  classes,
  tabLabels,
  children: contentArray,
  dept,
  addDepartment,
  addTrustGroup,
  currentDept,
  setCurrentDepartment,
}) => {
  // It's better to handle value hook from the page in which tabs would be used
  const [open, setOpen] = React.useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalRows, setTotalRows] = useState([]);
  const [value, setValue] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (index) => {
    setValue(index);
    onChange();
  };

  const addColumn = (newTab) => {
    addTrustGroup(newTab);
  };
  return (
    <Grid className={classes.tabs} container direction="column">
      <Grid item className={classes.tabHeaderContainer}>
        {tabLabels &&
          tabLabels.map((label, idx) => (
            <span
              key={idx}
              onClick={() => handleChange(idx)}
              className={clsx(
                classes.tabSpan,
                value === idx && classes.currentTab,
                idx !== 0 && classes.notFirstChild,
              )}
            >
              {label}
            </span>
          ))}
        <Button
          variant="text"
          className={classes.button}
          startIcon={<AddIcon />}
          disableRipple
          value="New tab"
          labelStyle={classes.labelStyle}
          onClick={handleClickOpen}
          textVariant="inherit"
        />
        <AddNewTabTemplate open={open} handleClose={handleClose} onAddClick={addColumn} />
      </Grid>
      <Grid className={classes.contentContainer} container direction="column">
        <Grid item>
          <Department
            dept={dept}
            addDepartment={addDepartment}
            currentDept={currentDept}
            setCurrentDepartment={setCurrentDepartment}
            deleteSelectedRow={selectedRows[value] ?? 0}
          />
        </Grid>
        {contentArray &&
          contentArray.map((content, idx) => (
            <Grid hidden={value !== idx} key={idx} item style={{ flex: 1 }}>
              {React.cloneElement(content, {
                selectedRows,
                setSelectedRows,
                totalRows,
                setTotalRows,
              })}
            </Grid>
          ))}
        <Grid item className={classes.footer} container alignContent="center">
          <Typography variant="body2">
            {selectedRows[value]
              ? `${selectedRows?.[value]} record selected`
              : `${totalRows?.[value]} records`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

Tabs.propTypes = {
  onChange: PropTypes.func,
  tabLabels: PropTypes.arrayOf(PropTypes.string),
  contentArray: PropTypes.arrayOf(PropTypes.element),
  trustGroups: PropTypes.arrayOf(PropTypes.string),
};
Tabs.defaultProps = {
  trustGroups: null,
  onChange: () => {},
  tabLabels: null,
  contentArray: [
    <span>Top 100 content</span>,
    <span>Top 1000 content</span>,
    <span>External partners content</span>,
    <span>Box communication base content</span>,
  ],
};

export default withStyles(styles)(Tabs);
