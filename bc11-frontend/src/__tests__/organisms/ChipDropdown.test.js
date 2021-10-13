import React from 'react';
import renderer from 'react-test-renderer';
import ChipDropdown from '../../components/organisms/ChipDropdown/ChipDropdown';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

describe('ChipDropdown', () => {
  let component;
  const handleClick = jest.fn();
  beforeEach(() => {
    act(() => {
      component = mount(<ChipDropdown onClick={handleClick} listOpen={false} />);
    });
  });
  it('Renders correctly', () => {
    let wrapper = renderer.create(<ChipDropdown />);
    expect(wrapper).toMatchSnapshot();
  });

  it('clicks correctly', () => {
    let wrapper = mount(<ChipDropdown onClick={handleClick} listOpen={false} />);
    wrapper.find('div').at(1).props().onClick();
    expect(wrapper).toMatchSnapshot();
  });
});
