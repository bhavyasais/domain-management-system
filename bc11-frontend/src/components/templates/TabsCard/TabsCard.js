import { Grid, Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const styles = () => ({
  headerStyle: {
    border: 'solid 1px #eaedf3',
  },
  tab: {
    height: '50px',
    color: '#949494',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  activeTab: {
    color: '#1d4cd7',
    borderBottom: '2px solid #1d4cd7',
  },
});

const TabsCard = ({ children, index, tabLabels, classes, headerStyle }) => {
  const [currentIndex, setCurrentIndex] = useState(index);
  const handleChange = (idx) => {
    setCurrentIndex(idx);
  };

  return (
    <Grid container direction="column">
      <Grid item container className={clsx(classes.headerStyle, headerStyle)} direction="row">
        {tabLabels?.map((label, idx) => (
          <Grid
            item
            className={clsx(classes.tab, currentIndex === idx && classes.activeTab)}
            onClick={() => {
              handleChange(idx);
            }}
            container
            alignItems="center"
            justify="center"
            xs={1}
          >
            <Typography variant="h4">{label}</Typography>
          </Grid>
        ))}
      </Grid>
      {children?.map((item, idx) => (
        <Grid item hidden={currentIndex !== idx}>
          <div>{item}</div>
        </Grid>
      ))}
    </Grid>
  );
};

TabsCard.propTypes = {
  index: PropTypes.number,
};
TabsCard.defaultProps = {
  index: 0,
};

export default withStyles(styles)(TabsCard);
