import IconButton from "../../components/atoms/IconButton/IconButtonAtom";
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';

describe("Icon Button", () => {
  let component;
  beforeEach(() => {
    act(() => {
      component = mount(<IconButton color="inherit" icon={<NotificationsOutlinedIcon />} />);
    });
  });

  it("should render correctly", () => {
    let wrapper;
    wrapper = renderer.create(<IconButton color="inherit" icon={<NotificationsOutlinedIcon />} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render color correctly", () => {
    expect(component.find(IconButton).at(0).props().color).toBe("inherit");
  });

  it("should render icon correctly", () => {
    expect(component.find(IconButton).at(0).props().icon).toStrictEqual(<NotificationsOutlinedIcon/>);
  });

});
