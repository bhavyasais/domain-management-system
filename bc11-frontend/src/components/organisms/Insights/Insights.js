import React from 'react';
import { Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import GraphCard from '../../molecules/GraphCard/GraphCard';
import { graphCardDetails, graphData } from '../../../utils/dashboardMockData';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '251px',
    border: 'solid 1px #eaedf3',
  },
  divider: {
    width: '85vw',
    marginBottom: '15px',
  },
  insights: {
    paddingTop: '20px',
    paddingLeft: '30px',
  },
});
const Insights = () => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <Grid container spacing={2}>
        <Grid item container>
          <Grid item className={classes.insights}>
            <Typography variant="h6">Insights</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Divider className={classes.divider} light={true} />
        </Grid>
        <Grid container item spacing={8} justify="center">
          {graphCardDetails.map((graphCardDetail, idx) => (
            <Grid item key={idx}>
              <GraphCard
                graphType={graphCardDetail.cardName}
                totalCount={graphCardDetail.totalCount}
                additionalCount={graphCardDetail.additionalCount}
                domainValue={graphData}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Insights;
