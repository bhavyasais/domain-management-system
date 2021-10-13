import React from 'react';
import { useState } from 'react';
import BarGraph from './BarGraph';

export default {
  title: 'Molecules/BarGraph',
};
const header = 'Relationship vs Group';
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

export const Bar = () => {
  const [item, setItem] = useState({
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
  });
  return (
    <BarGraph
      header={header}
      list={list}
      selectedValue={item}
      onDropdownChange={(value) => {
        setItem(list.find((obj) => obj.value === value));
      }}
    />
  );
};
