import Avatar from "../../components/atoms/Avatar/AvatarAtom";
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

describe("Avatar", () => {
  it("should render correctly", () => {
    let wrapper;
    wrapper = renderer.create(<Avatar />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders an image", () => {
    const wrapper = renderer.create(
      <Avatar src="https://cdn.zeplin.io/5fa102170abc4fbe7467eaa5/screens/438d5cb7-5113-4c26-9a9f-109b56acf94c.png" />
    );
    const tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders given image", () => {
    const wrapper = mount(<Avatar src="i.png" />);
    expect(wrapper.props().src).toBe("i.png");
  });
});
