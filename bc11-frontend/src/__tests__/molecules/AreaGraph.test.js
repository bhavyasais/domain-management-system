import React from 'react';
import renderer from 'react-test-renderer';
import AreaGraph from '../../components/molecules/AreaGraph/AreaGraph';

function createNodeMock() {
  const doc = document.implementation.createHTMLDocument();
  return { parentElement: doc.body };
}

describe('<SideNavigationBar/>', () => {
  let mounted;
  let onClick;
  const header = 'Trustscore Trend wrt Relationship Type';
  const list = [
    {
      value: 'zemoso',
      name: 'zemoso',
      data: [
        { date: '1st Dec', value: 30 },
        { date: '2nd Dec', value: 5 },
        { date: '3rd Dec', value: 20 },
        { date: '4th Dec', value: 40 },
        { date: '5th Dec', value: 12 },
        { date: '6th Dec', value: 25 },
        { date: '7th Dec', value: 30 },
      ],
      color: '#ff3162',
    },
    {
      value: 'stanford',
      name: 'stanford',
      data: [
        { date: 'Mon', value: 30 },
        { date: 'Tue', value: 15 },
        { date: 'Wen', value: 12 },
        { date: 'Thu', value: 40 },
        { date: 'Fri', value: 20 },
        { date: 'Sat', value: 5 },
        { date: 'Sun', value: 30 },
      ],
      color: '#ff3162',
    },
  ];

  it('Renders correctly', () => {
    const wrapper = renderer.create(
      <AreaGraph
        header={header}
        list={list}
        onDropdownChange={onClick}
        selectedValue={{
          value: 'stanford',
          name: 'stanford',
          data: [
            { date: 'Mon', value: 30 },
            { date: 'Tue', value: 15 },
            { date: 'Wen', value: 12 },
            { date: 'Thu', value: 40 },
            { date: 'Fri', value: 20 },
            { date: 'Sat', value: 5 },
            { date: 'Sun', value: 30 },
          ],
          color: '#ff3162',
        }}
      />,
      { createNodeMock },
    );
    expect(wrapper).toMatchSnapshot();
  });
});
