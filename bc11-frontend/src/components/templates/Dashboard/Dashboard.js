import React, { useState } from 'react';
import { Grid, makeStyles, Typography, useTheme } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import AccessPanel from '../AccessPanel/AccessPanel';
import { DASHBOARD_HEADER_LABEL, GREET_USER, SUBHEADING } from '../../../utils/Strings';
import Insights from '../../organisms/Insights/Insights';
import RelationshipCard from '../../organisms/RelationshipCard/RelationshipCard';
import BarGraph from '../../molecules/BarGraph/BarGraph';
import {
  doNotTrustTabData,
  trustGroupGraphData,
  trustScoreGraphData,
  trustTabData,
  graphCardDetails,
  graphData,
} from '../../../utils/dashboardMockData';
import TabsCard from '../TabsCard/TabsCard';
import AreaGraph from '../../molecules/AreaGraph/AreaGraph';
const useStyles = makeStyles((theme) => ({
  header: {
    width: '88px',
    height: '21px',
  },
  welcome: {
    width: '263px',
    height: '30px',
    margin: '30px 1083px 10px 30px',
    color: theme?.palette?.black?.main,
  },
  welcome1: {
    width: '274px',
    height: '16px',
    margin: '10px 1072px 30px 30px',
    color: theme?.palette?.blueGrey?.main,
  },
  insights: {
    padding: '30px 32px 30px 30px',
  },
  relationship: {
    padding: '5px 40px 30px 30px',
  },
  containerStyle: {
    backgroundColor: theme?.palette?.white?.main,
  },
  tabs: {
    padding: '5px 40px 30px 30px',
  },
}));
const Dashboard = ({ subHeading }) => {
  const classes = useStyles();
  const { user } = useAuth0();
  const theme = useTheme();
  const userName = () => {
    let arr = user ? user.nickname?.split('.') : ['Naveen'];
    return arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
  };

  const [value1, setValue1] = useState({ name: '', value: '', data: null });
  const [value2, setValue2] = useState({ name: '', value: '', data: null });
  const [value3, setValue3] = useState(trustTabData[0]);
  const [value4, setValue4] = useState(doNotTrustTabData[0]);

  const handleGroupChange = (value) => {
    setValue1(trustGroupGraphData.find((item) => item.value === value));
  };
  const handleTrustscoreChange = (value) => {
    setValue2(trustScoreGraphData.find((item) => item.value === value));
  };
  const handleTabGroupChange = (value) => {
    setValue3(trustScoreGraphData.find((item) => item.value === value));
  };
  return (
    <AccessPanel headerLabel={DASHBOARD_HEADER_LABEL} headerVariant="h4" className={classes.header}>
      <Grid style={{ backgroundColor: theme?.palette?.grey?.main }}>
        <Typography variant="h2" className={classes.welcome}>
          {GREET_USER} {userName()}
        </Typography>
        <Typography variant="body1" className={classes.welcome1}>
          {SUBHEADING}
        </Typography>
        <Grid item className={classes.insights}>
          <Insights graphCardDetails={graphCardDetails} graphData={graphData} />
        </Grid>
        <Grid item className={classes.relationship}>
          <RelationshipCard header="Relationship" containerStyle={classes.containerStyle}>
            <BarGraph
              header="Relationship vs Group"
              list={trustGroupGraphData}
              selectedValue={value1}
              onDropdownChange={handleGroupChange}
            />
            <BarGraph
              header="Relationship vs Trustscore Range"
              list={trustScoreGraphData}
              selectedValue={value2}
              onDropdownChange={handleTrustscoreChange}
            />
          </RelationshipCard>
        </Grid>
        <Grid item className={classes.tabs}>
          <TabsCard tabLabels={['Trust', 'Do not trust']} headerStyle={classes.containerStyle}>
            <RelationshipCard containerStyle={classes.containerStyle}>
              <BarGraph
                header="Relationship vs Group"
                list={trustTabData}
                selectedValue={value3}
                onDropdownChange={handleTabGroupChange}
              />
              <AreaGraph
                header="Trustscore Trend wrt Relationship Type"
                list={doNotTrustTabData}
                selectedValue={value4}
                onDropdownChange={(value) => {
                  setValue4(doNotTrustTabData.find((obj) => obj.value === value));
                }}
              />
            </RelationshipCard>
            <RelationshipCard containerStyle={classes.containerStyle}>
              <BarGraph
                header="Relationship vs Group"
                list={trustTabData}
                selectedValue={value3}
                onDropdownChange={handleTabGroupChange}
              />
              <AreaGraph
                header="Trustscore Trend wrt Relationship Type"
                list={doNotTrustTabData}
                selectedValue={value4}
                onDropdownChange={(value) => {
                  setValue4(doNotTrustTabData.find((obj) => obj.value === value));
                }}
              />
            </RelationshipCard>
          </TabsCard>
        </Grid>
      </Grid>
    </AccessPanel>
  );
};
Dashboard.propTypes = {
  headerLabel: PropTypes.string,
};
Dashboard.defaultProps = {
  headerLabel: 'Dashboard',
};

export default Dashboard;
