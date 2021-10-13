import Button from "../../components/atoms/Button/ButtonAtom";
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

describe("Button", () => {
  const handleClick = jest.fn();
  let component;
  beforeEach(() => {
    act(() => {
      component = mount(<Button variant="contained" value="Add" onClick={handleClick} />);
    });
  });

  it("should render correctly", () => {
    let wrapper;
    wrapper = renderer.create(<Button variant="contained" value="Add" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should have the text Add", () => {
      expect(component.find(Button).text()).toEqual("Add");
  });

  it("should have the variant contained", () => {
    expect(component.find(Button).at(0).props().variant).toBe("contained");
  });

  it("should call the onClick function when clicked", () => {
    component.find(Button).at(0).props().onClick();
    expect(handleClick).toHaveBeenCalledTimes(1);
  })

});
