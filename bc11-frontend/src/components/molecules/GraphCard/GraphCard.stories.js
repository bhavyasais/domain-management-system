import React, { useState } from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import GraphCard from './GraphCard';

export default {
  component: GraphCard,
  title: 'Molecules/GraphCard',
  decorators: [withKnobs],
};

export const graphCard = () => {
  const [item, setItem] = useState({
    value: 'zemoso',
    name: 'zemoso',
    data: [
      { date: 'Mon', value: 30 },
      { date: 'Tue', value: 15 },
      { date: 'Wen', value: 12 },
      { date: 'Thu', value: 40 },
      { date: 'Fri', value: 20 },
      { date: 'Sat', value: 5 },
      { date: 'Sun', value: 30 },
    ],
  });
  return (
    <GraphCard
      graphType={text('Card Header', 'Trusted')}
      totalCount={text('Total Count', '30')}
      additionalCount={text('Additional Count', '1')}
      domainValue={item}
    />
  );
};
