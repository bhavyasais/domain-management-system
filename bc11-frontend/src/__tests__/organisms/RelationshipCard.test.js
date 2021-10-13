import React from 'react';
import renderer from 'react-test-renderer';
import RelationshipCard from '../../components/organisms/RelationshipCard/RelationshipCard';

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
      <RelationshipCard
        groupList={list}
        trustscoreList={list}
        groupSelectedValue={{ name: '', value: '', data: null }}
        trustscoreSelectedValue={{ name: '', value: '', data: null }}
        onGroupChange={onClick}
        onTrustscoreChange={onClick}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
