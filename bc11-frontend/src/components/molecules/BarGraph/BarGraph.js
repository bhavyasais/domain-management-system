import { Grid, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown/Dropdown';

const styles = () => ({
  container: {
    border: '1px solid  #eeeeee',
    padding: '24px',
    maxWidth: '769px',
  },
  header: {
    height: '40px',
  },
  textColor: {
    color: '#3e3f42',
  },
  headerContainer: {
    marginBottom: '24px',
  },
  axisStyle: {
    fontSize: '10px',
    color: '#949494',
  },
});

const BarGraph = ({ classes, header, list, selectedValue, onDropdownChange }) => {
  return (
    <Grid container className={classes.container}>
      <Grid container item direction="row" className={classes.headerContainer}>
        <Grid item container className={classes.header} xs={6} alignItems="flex-end">
          <Typography className={classes.textColor}>{header}</Typography>
        </Grid>
        <Grid item container xs={6} justify="flex-end">
          <Dropdown selectedItem={selectedValue} list={list} onChange={onDropdownChange} />
        </Grid>
      </Grid>
      {selectedValue?.data && (
        <Grid item xs={12}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={selectedValue?.data} maxBarSize={50}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                className={classes.axisStyle}
              />
              <YAxis axisLine={false} tickLine={false} className={classes.axisStyle} />
              <Bar dataKey="value" fill="#1d4cd7" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      )}
    </Grid>
  );
};

BarGraph.propTypes = {
  header: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string,
          value: PropTypes.string,
        }),
      ),
    }),
  ),
  selectedValue: PropTypes.shape({
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
  }),
  onDropdownChange: PropTypes.func,
};
BarGraph.defaultProps = {
  header: 'Default Header',
  list: [],
  selectedValue: { value: '', data: null, name: '' },
  onDropdownChange: null,
};

export default withStyles(styles)(BarGraph);
