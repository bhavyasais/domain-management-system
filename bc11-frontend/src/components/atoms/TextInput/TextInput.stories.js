import React, { useState } from 'react';
import TextInput from './TextInput';

export default {
  title: 'Atoms/TextInput',
};

export const textInput = () => {
  const [state, setState] = useState("");
  const handleOnChange = (event) => {
    setState(event.target.value);
  };
  return <TextInput onChange={handleOnChange} value={state} />;
};
