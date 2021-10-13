import React from 'react';
import renderer from 'react-test-renderer';
import TextInput from '../../components/atoms/TextInput/TextInput';

describe('TextInput', () => {
  it('should render correctly', () => {
    let wrapper;
    wrapper = renderer.create(<TextInput />);
    expect(wrapper).toMatchSnapshot();
  });
});
