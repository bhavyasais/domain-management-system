import React, { useState } from 'react';
import BarGraph from '../../molecules/BarGraph/BarGraph';
import RelationshipCard from './RelationshipCard';

export default {
  title: 'Organisms/RelationshipCard',
};

export const relationshipCard = () => {
  const [value1, setValue1] = useState({ name: '', value: '', data: null });
  const [value2, setValue2] = useState({ name: '', value: '', data: null });
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
        { date: '8th Dec', value: 40 },
        { date: '9th Dec', value: 12 },
        { date: '10th Dec', value: 25 },
        { date: '11th Dec', value: 30 },
        { date: '12th Dec', value: 25 },
        { date: '13th Dec', value: 30 },
        { date: '14th Dec', value: 25 },
        { date: '15th Dec', value: 30 },
        { date: '16th Dec', value: 25 },
        { date: '17th Dec', value: 30 },
      ],
    },
    {
      value: 'stanford',
      name: 'stanford',
      data: [
        { date: '1st Dec', value: 30 },
        { date: '2nd Dec', value: 5 },
        { date: '3rd Dec', value: 20 },
        { date: '4th Dec', value: 40 },
        { date: '5th Dec', value: 12 },
        { date: '6th Dec', value: 25 },
        { date: '7th Dec', value: 30 },
        { date: '8th Dec', value: 40 },
        { date: '9th Dec', value: 12 },
        { date: '10th Dec', value: 25 },
        { date: '11th Dec', value: 30 },
        { date: '12th Dec', value: 25 },
        { date: '13th Dec', value: 30 },
        { date: '14th Dec', value: 25 },
        { date: '15th Dec', value: 30 },
        { date: '16th Dec', value: 25 },
        { date: '17th Dec', value: 30 },
      ],
    },
  ];

  const handleGroupChange = (value) => {
    console.log(value);
    setValue1(list.find((item) => item.value === value));
  };
  const handleTrustscoreChnage = (value) => {
    console.log(value);
    setValue2(list1.find((item) => item.value === value));
  };

  return (
    <RelationshipCard header="Relationship">
      <BarGraph
        header="Relationship vs Group"
        list={list1}
        selectedValue={value1}
        onDropdownChange={handleGroupChange}
      />
      <BarGraph
        header="Relationship vs Trustscore Range"
        list={list1}
        selectedValue={value2}
        onDropdownChange={handleTrustscoreChnage}
      />
    </RelationshipCard>
  );
};
