import React from 'react';
import { mount, shallow } from 'enzyme';
import CollabCard from '../../components/molecules/CollabCard/CollabCard';

import { act } from 'react-dom/test-utils';
import { Card } from '@material-ui/core';

describe('<CollabCard/>', () => {
  let component;
  const handleClick = jest.fn();
  beforeEach(() => {
    act(() => {
      component = mount(<CollabCard onClick={handleClick} />);
    });
  });

  it('Renders correctly', () => {
    let wrapper;
    wrapper = mount(<CollabCard />);
    expect(wrapper).toMatchSnapshot();
  });

  it('opens the modal', () => {
    const wrapper = mount(<CollabCard onClick={handleClick} />);
    wrapper.find(Card).at(0).props().onMouseEnter();
    wrapper.find(Card).at(0).props().onMouseLeave();
    expect(wrapper).toMatchSnapshot();
  });
});
