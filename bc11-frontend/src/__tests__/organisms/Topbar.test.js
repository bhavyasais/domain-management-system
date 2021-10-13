import Topbar from '../../components/organisms/Topbar/Topbar';
import React from 'react';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import IconButton from '../../components/atoms/IconButton/IconButtonAtom';
import IconWithBadge from '../../components/atoms/IconWithBadge/IconWithBadge';
import Avatar from '../../components/atoms/Avatar/AvatarAtom';
import {Button} from '@material-ui/core';

describe('Topbar', () => {
  var component;
  const handleClick = jest.fn();
  beforeEach(() => {
    act(() => {
      component = mount(<Topbar label="Centralized  Communication Command Center" />);
    });
  });
  it('should render correctly', () => {
    let wrapper;
    wrapper = renderer.create(<Topbar label="Centralized  Communication Command Center" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render topbar label correctly', () => {
    expect(component.find(Topbar).at(0).props().label).toBe(
      'Centralized  Communication Command Center',
    );
  });

  it('should render two icon buttons', () => {
    expect(component.find(IconButton)).toHaveLength(2);
  });

  it('should render icon buttons with badges', () => {
    expect(component.find(IconWithBadge)).toHaveLength(2);
  });

  it('should render an avatar', () => {
    expect(component.find(Avatar)).toHaveLength(1);
  });

  it('opens the avatar', () => {
    const wrapper = mount(
      <Topbar
        onClick={handleClick}
        label=""
        onClickAway={handleClick}
        open={true}
      />,
    );
    wrapper.find(Button).at(0).props().onClick();
    
  });
});
