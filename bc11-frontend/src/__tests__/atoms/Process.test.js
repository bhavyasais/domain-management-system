jest.mock("react-lottie");
import React from "react";
import renderer from "react-test-renderer";
import Processing from "../../components/atoms/Process/Processing";

describe("<Processing/>", () => {
  it("Renders correctly", () => {
    let wrapper = renderer.create(<Processing />);
    expect(wrapper).toMatchSnapshot();
  });
});
