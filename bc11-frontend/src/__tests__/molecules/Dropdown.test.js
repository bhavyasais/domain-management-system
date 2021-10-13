import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Dropdown from '../../components/molecules/Dropdown/Dropdown';
import { Select } from '@material-ui/core';

describe('<SideNavigationBar/>', () => {
  let mounted;
  let onClick;
  const list = [
    { name: 'zemosolabs', value: 'zemosolabs' },
    { name: 'stanford', value: 'zemostanfordsolabs' },
  ];
  beforeEach(() => {
    onClick = jest.fn();
    act(() => {
      mounted = mount(
        <Dropdown list={list} onChange={onClick} selectedItem={{ name: '', value: '' }} />,
      );
    });
  });

  it('Renders correctly', () => {
    let wrapper;
    wrapper = renderer.create(
      <Dropdown list={list} onChange={onClick} selectedItem={{ name: '', value: '' }} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('onClick works on clicking active icon', () => {
    mounted.find(Select).at(0).props().onChange();
    expect(onClick).toHaveBeenCalled();
  });
});
