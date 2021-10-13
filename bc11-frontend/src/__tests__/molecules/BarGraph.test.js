import React from 'react';
import renderer from 'react-test-renderer';
import BarGraph from '../../components/molecules/BarGraph/BarGraph';

function createNodeMock() {
  const doc = document.implementation.createHTMLDocument();
  return { parentElement: doc.body };
}

describe('<SideNavigationBar/>', () => {
  let mounted;
  let onClick;
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
    },
    {
      value: 'stanford',
      name: 'stanford',
      data: [
        { date: '1st Dec', value: 30 },
        { date: '2nd Dec', value: 15 },
        { date: '3rd Dec', value: 12 },
        { date: '4th Dec', value: 40 },
        { date: '5th Dec', value: 20 },
        { date: '6th Dec', value: 5 },
        { date: '7th Dec', value: 30 },
      ],
    },
  ];

  it('Renders correctly', () => {
    const wrapper = renderer.create(
      <BarGraph
        list={list}
        onDropdownChange={onClick}
        selectedValue={{
          name: 'stanford',
          value: 'stanford',
          data: [
            { date: '1st Dec', value: 30 },
            { date: '2nd Dec', value: 15 },
            { date: '3rd Dec', value: 12 },
            { date: '4th Dec', value: 40 },
            { date: '5th Dec', value: 20 },
            { date: '6th Dec', value: 5 },
            { date: '7th Dec', value: 30 },
          ],
        }}
      />,
      { createNodeMock },
    );
    expect(wrapper).toMatchSnapshot();
  });
});
