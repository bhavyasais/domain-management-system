import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import mail from '../../../assets/mail.png';
import search from '../../../assets/search.png';
import filter from '../../../assets/filter.png';
import list_icon from '../../../assets/list.png';
import sort from '../../../assets/sort.png';
import deleteRow from '../../../assets/deleteRow.png';
import sidebar from '../../../assets/sidebar.png';
import { Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddNewDeptTemplate from '../../templates/DialogTemplate/AddNewDeptTemplate';

const useStyles = makeStyles({
  dropDownContainer: {
    height: '36px',
  },
  dropDownHeader: {
    marginBottom: '0.8em',
    padding: '0.2em 2em 0.2em 16px',
    fontSize: '14px',
    color: '#949494',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    verticalAlign: 'bottom',
    width: '220px',
    borderBottom: '1px solid #e8ecef',
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #e8ecef',
    fontFamily: 'Roboto',
    backgroundColor: '#ffffff',
  },
  dropDownListContainer: {
    height: '228px',
    borderRadius: '4px',
  },
  dropDownList: {
    width: '256px',
    margin: '0',
    paddingTop: '10px',
    border: '2px solid #e5e5e5',
    boxSizing: 'border-box',
    fontSize: '14px',
    zIndex: '123',
    backgroundColor: '#FFFFFF',
    color: '#949494',
    '&:first-child': {
      paddingTop: '0.8em',
    },
    flexDirection: 'column',
    position: 'absolute',
  },
  listItem: {
    paddingBottom: '10px',
    listStyle: 'none',
    marginBottom: '1px',
    cursor: 'pointer',
  },
  finalItem: {
    paddingBottom: '10px',
    listStyle: 'none',
    marginBottom: '1px',
    color: 'blue',
    cursor: 'pointer',
  },
  more: {
    width: '24px',
    height: '24px',
  },
  filter: {
    width: '32px',
    height: '16px',
    margin: '5.9px 20px 15.9px 4px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.14',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: 'grey',
  },
  group: {
    width: '38px',
    height: '16px',
    margin: '5.9px 20px 15.9px 4px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.14',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: 'grey',
  },
  iconFilter: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '8px',
    paddingRight: '8px',
    color: 'grey',
    fontFamily: 'Roboto',
    fontSize: '14px',
    alignItems: 'center',
  },
  deleteRow: {
    width: '114px',
    height: '16px',
    margin: '5.9px 779px 15.9px 4px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.14',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: 'grey',
  },
  items: {
    width: '100%',
    flexDirection: 'row',
    display: 'flex',
  },
  textFilter: {
    marginLeft: '4px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.14',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: 'grey',
  },
  selectedDepartment: {
    marginBottom: '0.8em',
    padding: '0.4em 2em 0.4em 8px',
    fontSize: '14px',
    color: '#1c1c21',
    display: 'flex',
    alignItems: 'center',
    verticalAlign: 'bottom',
    cursor: 'pointer',
    textOverflow: 'visible',
  },
  searchIcon: {
    width: '24px',
    height: '24px',
    alignSelf: 'center',
    marginRight: '12px',
  },
  moreVert: {
    marginLeft: '16px',
    color: 'rgba(25, 1, 52, 0.16)',
  },
  sidebarStyle: {
    marginRight: '16px',
    width: '16.7px',
    height: '15px',
  },
  moreVertLine: {
    height: '24px',
    borderLeft: '1px solid #cccccc',
    marginLeft: '4px',
    marginRight: '4px',
  },
  searchBox: {
    width: '24px',
    height: '24px',
    marginRight: '8px',
  },
  mailBox: {
    width: '16.7px',
    height: '15px',
  },
  paddingLeftStyle: {
    paddingLeft: '1rem',
  },
});

export default function DepartmentsAdd({
  dept,
  addDepartment,
  currentDept,
  setCurrentDepartment,
  deleteSelectedRow,
}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const icons = [
    { src: filter, name: 'Filter' },
    { src: list_icon, name: 'List' },
    { src: sort, name: 'Sort' },
  ];
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const handleItemClick = (value) => () => {
    setCurrentDepartment(value);
  };
  const addItems = (department) => {
    addDepartment({
      name: department,
      description: `For ${department} dept`,
      created_by: 'Test User',
    });
  };
  return (
    <div className={classes.main}>
      <div className={classes.dropDownContainer} onClick={toggling}>
        <div>
          {currentDept ? (
            <div className={classes.selectedDepartment}>
              <img src={sidebar} alt="side bar" className={classes.sidebarStyle} />
              {currentDept.name}
              <MoreVertIcon className={classes.moreVert} />
              <div className={classes.moreVertLine} />
            </div>
          ) : null}
        </div>
        {isOpen && (
          <div className={classes.dropDownListContainer}>
            <div className={classes.dropDownList}>
              <div className={classes.dropDownHeader}>
                <img src={search} className={classes.searchBox} alt="search" />
                Enable Department Access
              </div>
              <div className={classes.paddingLeftStyle}>
                {dept?.map((item, idx) => (
                  <div className={classes.listItem} onClick={handleItemClick(item)} key={idx}>
                    <img src={mail} className={classes.mailBox} alt="mail" /> {item.name}
                  </div>
                ))}
                <div className={classes.finalItem} onClick={handleClickOpen}>
                  + New Department
                </div>
              </div>
            </div>
          </div>
        )}
        <AddNewDeptTemplate open={open} handleClose={handleClose} onAddClick={addItems} />
      </div>
      <div className={classes.items}>
        {icons.map((item) => (
          <div className={classes.iconFilter} key={item.name}>
            <img src={item.src} key={item.name} alt="icon" />
            <Typography className={classes.textFilter}>{item.name}</Typography>
          </div>
        ))}
        {deleteSelectedRow !== 0 && (
          <div className={classes.iconFilter}>
            <img src={deleteRow} alt="icon" />
            <Typography className={classes.textFilter}>
              Delete Selected({deleteSelectedRow})
            </Typography>
          </div>
        )}
      </div>

      <div className={classes.searchIcon}>
        <img src={search} alt="search" />
      </div>
    </div>
  );
}
