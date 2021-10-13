import React from 'react';
import { graphCardDetails, graphData } from '../../../utils/dashboardMockData';
import Insights from './Insights';

export default {
  title: 'Organisms/Insights',
};

export const insights = () => {
  return <Insights graphCardDetails={graphCardDetails} graphData={graphData} />;
};
