import React, { useState } from 'react';
import Dropdown from './Dropdown';

export default {
  title: 'Molecules/DropDown',
};

export const DropDown = () => {
  const [state, setState] = useState({ name: '', value: '' });
  const list = [
    { name: 'zemosolabs', value: 'zemosolabs' },
    { name: 'stanford', value: 'zemostanfordsolabs' },
  ];
  const handleOnChange = (event) => {
    setState({ name: event, value: event });
  };
  return <Dropdown onChange={handleOnChange} selectedItem={state} list={list} />;
};
