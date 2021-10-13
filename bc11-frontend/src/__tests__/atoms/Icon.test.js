import Icon from "../../components/atoms/Icon/IconAtom";
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import CloseIcon from "@material-ui/icons/Close";

describe("Icon", () => {
  let component;
  beforeEach(() => {
    act(() => {
      component = mount(<Icon icon={<CloseIcon />} />);
    });
  });

  it("should render correctly", () => {
    let wrapper;
    wrapper = renderer.create(<Icon icon={<CloseIcon />} />);
    expect(wrapper).toMatchSnapshot();
  });
  it("should render icon correctly", () => {
    expect(component.find(Icon).at(0).props().icon).toStrictEqual(<CloseIcon/>);
  });
});
