import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import theme from '../../../theme';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '291px',
    height: '129px',
    borderRadius: '4px',
    flexGrow: 1,
    border: 'solid 1px #eeeeee',
  },
  graphType: {
    width: '104px',
    height: '24px',
    color: '#5c5c5c',
    fontSize: '16px',
    padding: '30px 156.8px 75px 30.2px',
  },
  totalCount: {
    width: '34px',
    height: '35px',
    color: theme?.palette?.black?.main,
    fontSize: '30px',
    margin: '-64px 30.2px',
    fontWeight: 'normal',
    backgroundColor: theme?.palette?.white?.main,
  },
  additionalCount: {
    width: '16px',
    height: '16px',
    fontSize: '14px',
    padding: '44px 197.7px 39px 77.3px',
    color: theme?.palette?.secondary?.main,
  },
  image: {
    transform: 'translate(155px, -80px)',
  },
}));
const GraphCard = ({ totalCount, additionalCount, domainValue, graphType }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} variant="outlined">
      <Grid container direction="row" alignItems="center" justify="space-evenly">
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h5" className={classes.graphType}>
                {graphType}
              </Typography>
            </Grid>
            <Grid container direction="row">
              <Grid item>
                <Typography variant="h1" className={classes.totalCount}>
                  {totalCount}
                </Typography>
                <Grid item className={classes.additionalCount}>
                  <Typography variant="caption">+{additionalCount}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {domainValue?.data && (
          <Grid item xs={12} className={classes.image}>
            <ResponsiveContainer width={105.6} height={36.2}>
              <AreaChart data={domainValue?.data}>
                <Area
                  dataKey="value"
                  fill={
                    graphType === 'Do Not Trust'
                      ? theme?.palette?.error?.main
                      : graphType === 'Trusted'
                      ? theme?.palette?.secondary?.main
                      : theme?.palette?.primary?.main
                  }
                  fillOpacity={0.1}
                  stroke={
                    graphType === 'Do Not Trust'
                      ? theme?.palette?.error?.main
                      : graphType === 'Trusted'
                      ? theme?.palette?.secondary?.main
                      : theme?.palette?.primary?.main
                  }
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
export default GraphCard;
