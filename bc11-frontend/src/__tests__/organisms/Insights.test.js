import Insights from '../../components/organisms/Insights/Insights';
import React from 'react';
import renderer from 'react-test-renderer';

function createNodeMock() {
  const doc = document.implementation.createHTMLDocument();
  return { parentElement: doc.body };
}
const graphCardDetails = [
  {
    cardName: 'Total Domains',
    totalCount: 30,
    additionalCount: 1,
  },
  {
    cardName: 'Total Received',
    totalCount: 30,
    additionalCount: 5,
  },
  {
    cardName: 'Trusted',
    totalCount: 30,
    additionalCount: 5,
  },
  {
    cardName: 'Do Not Trust',
    totalCount: 30,
    additionalCount: 1,
  },
];

const graphData = {
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
};
describe('Insights', () => {
  it('should render correctly', () => {
    let wrapper;
    wrapper = renderer.create(
      <Insights graphCardDetails={graphCardDetails} graphData={graphData} />,
      { createNodeMock },
    );
    expect(wrapper).toMatchSnapshot();
  });
});
