import React from "react";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import LoginPage from "../../pages/LoginPage/LoginPage";

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    isAuthenticated: false,
    loginWithRedirect: jest.fn(),
    logout: jest.fn(),
  }),
}));

describe("CollabModal", () => {
  let component;
  beforeEach(() => {
    act(() => {
      component = mount(<LoginPage />);
    });
  });
  it("should render correctly", () => {
    let wrapper;
    wrapper = renderer.create(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
  });

  it("logoutWithRedirect should be called", () => {
    expect(component).toBeDefined();
    component.find("button").at(0).props().onClick();
  });
});
