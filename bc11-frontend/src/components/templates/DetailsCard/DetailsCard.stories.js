import React, { useState } from 'react';
import DetailsCard from './DetailsCard';
import { DESCRIPTION, SOURCE_DETAILS_HEADER, THREAT_DETAILS_HEADER } from '../../../utils/Strings';

export default {
  title: 'Templates/DetailsCard',
};

export const detailsCard = () => {
  const [state, setState] = useState({ name: 'Do not trust', value: 'Do not trust' });
  const trustGroups = [
    { name: 'Do not trust', value: 'Do not trust' },
    { name: 'Trusted', value: 'Trusted' },
  ];
  const handleOnChange = (event) => {
    setState({ name: event, value: event });
  };
  var cardDetails = {
    id: '#12345',
    Domain: 'Do not trust',
    From: 'Akshay.sunder@gmail.com',
    threatType: 'Spam',
    trustScore: 22,
    trustGroups: trustGroups,
    onChange: { handleOnChange },
    time: '14-12-2019, 12:43pm',
    threatLevel: 'High',
    description: DESCRIPTION,
    emailDetails: DESCRIPTION,
  };

  return (
    <DetailsCard
      cardDetails={cardDetails}
      sourceDetailsHeader={SOURCE_DETAILS_HEADER}
      threatDetailsHeader={THREAT_DETAILS_HEADER}
      selectedItem={state}
    />
  );
};
