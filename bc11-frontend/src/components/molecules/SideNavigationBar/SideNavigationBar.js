import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import sideNavIconGetter from '../../../utils/sideNavIconGetter';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    borderRight: '1px solid #eeeeee',
    height: '100vh',
    width: '64px',
  },
  image: {
    heigth: '24px',
    width: '24px',
    marginBottom: '22px',
    marginTop: '22px',
    cursor: 'pointer',
  },
  imageContainer: {
    width: '64px',
    justifyContent: 'center',
  },
  activeIcon: {
    backgroundColor: '#eaf0ff',
    borderLeft: '2px solid #1d4cd7',
  },
  header: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#1d4cd7',
    fontSize: '28px',
    fontWeight: '300',
    marginBottom: '18px',
    marginTop: '18px',
    width: '64px',
    wordWrap: 'break-word',
  },
});

const SideNavigationBar = ({ classes, header }) => {
  const iconList = sideNavIconGetter.getSideBarIcons();
  const [currentIconIndex, setCurrentIconIndex] = useState(1);
  const history = useHistory();
  const handleOnClick = (index, active) => () => {
    if (active) {
      setCurrentIconIndex(index);
      switch (index) {
        case 1:
          history.push('/base');
          break;
        case 2:
          history.push('/emailIntegration');
          break;
      }
    }
  };

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <Typography className={classes.header}>{header}</Typography>
      </Grid>

      {iconList.map((item, index) => (
        <Grid
          item
          container
          className={clsx(classes.imageContainer, currentIconIndex === index && classes.activeIcon)}
          key={index}
        >
          <img
            src={item.icon}
            className={classes.image}
            onClick={handleOnClick(index, item.active)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

SideNavigationBar.propTypes = {
  header: PropTypes.string,
  onClick: PropTypes.func,
};
SideNavigationBar.defaultProps = {
  onClick: null,
  header: 'io',
};

export default withStyles(styles, { withTheme: true })(SideNavigationBar);
