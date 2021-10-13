import React, { useState } from 'react';
import AreaGraph from '../../molecules/AreaGraph/AreaGraph';
import BarGraph from '../../molecules/BarGraph/BarGraph';
import RelationshipCard from '../../organisms/RelationshipCard/RelationshipCard';
import TabsCard from './TabsCard';

export default {
  title: 'Templates/TabCard',
};

export const tabCard = () => {
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

  const list1 = [
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
  const [value1, setValue1] = useState(list[0]);
  const [value2, setValue2] = useState(list1[0]);

  const handleGroupChange = (value) => {
    console.log(value);
    setValue1(list.find((item) => item.value === value));
  };

  return (
    <TabsCard tabLabels={['Trust', 'Do not trust']}>
      <RelationshipCard>
        <BarGraph
          header="Relationship vs Group"
          list={list}
          selectedValue={value1}
          onDropdownChange={handleGroupChange}
        />
        <AreaGraph
          header="Trustscore Trend wrt Relationship Type"
          list={list1}
          selectedValue={value2}
          onDropdownChange={(value) => {
            setValue2(list1.find((obj) => obj.value === value));
          }}
        />
      </RelationshipCard>
      <RelationshipCard>
        <BarGraph
          header="Relationship vs Group"
          list={list}
          selectedValue={value1}
          onDropdownChange={handleGroupChange}
        />
        <AreaGraph
          header="Trustscore Trend wrt Relationship Type"
          list={list1}
          selectedValue={value2}
          onDropdownChange={(value) => {
            setValue2(list1.find((obj) => obj.value === value));
          }}
        />
      </RelationshipCard>
    </TabsCard>
  );
};
