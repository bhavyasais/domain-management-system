import AppBanner from "../../components/molecules/AppBanner/AppBanner";
import React from "react";
import renderer from "react-test-renderer";
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

describe("Banner", () => {
  let component;
  const handleClick = jest.fn();
  beforeEach(() => {
    act(() => {
      component = mount(<AppBanner />);
    });
  });
  it("Renders correctly", () => {
    let wrapper = renderer.create(<AppBanner />);
    expect(wrapper).toMatchSnapshot();
  });

  it("opens the modal", () => {
    const wrapper = mount(<AppBanner onClick={handleClick}/>);
    wrapper.find('ButtonAtom').at(0).props().onClick();
    wrapper.find('DialogTemplate').at(0).props().handleClose();
  });

});
