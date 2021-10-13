import React from 'react';
import renderer from 'react-test-renderer';
import { DESCRIPTION, SOURCE_DETAILS_HEADER, THREAT_DETAILS_HEADER } from '../../utils/Strings';
import DetailsCard from '../../components/templates/DetailsCard/DetailsCard';
const handleOnChange = jest.fn();
const trustGroups = [
  { name: 'Do not trust', value: 'Do not trust' },
  { name: 'Trusted', value: 'Trusted' },
];

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

describe('<DetailsCard/>', () => {
  it('Renders correctly', () => {
    let wrapper;
    wrapper = renderer.create(
      <DetailsCard
        cardDetails={cardDetails}
        sourceDetailsHeader={SOURCE_DETAILS_HEADER}
        threatDetailsHeader={THREAT_DETAILS_HEADER}
        selectedItem={{ name: 'Do not trust', value: 'Do not trust' }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
