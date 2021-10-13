import React from 'react';
import renderer from 'react-test-renderer';
import GraphCard from '../../components/molecules/GraphCard/GraphCard';

function createNodeMock() {
  const doc = document.implementation.createHTMLDocument();
  return { parentElement: doc.body };
}

describe('GraphCard', () => {
  it('Renders correctly', () => {
    let wrapper = renderer.create(
      <GraphCard
        graphType="Trusted"
        totalCount="30"
        additionalCount="1"
        domainValue={{
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
        }}
      />,
      { createNodeMock },
    );
    expect(wrapper).toMatchSnapshot();
  });
});
