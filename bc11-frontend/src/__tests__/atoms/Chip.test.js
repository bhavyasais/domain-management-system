import Chip from "../../components/atoms/Chip/Chip";
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

describe("<Chip/>", () => {
  let mounted;
  beforeEach(() => {
    act(() => {
      mounted = mount(<Chip label="Test label" />);
    });
  });

  it("Renders correctly", () => {
    let wrapper;
    wrapper = renderer.create(<Chip label="Test label" />);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders correct label", () => {
    expect(mounted.find("Chip").at(0).props().label).toBe("Test label");
  });
});
