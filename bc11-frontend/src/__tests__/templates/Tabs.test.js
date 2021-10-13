import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import Tabs from "../../components/templates/Tabs/Tabs";
import AddNewTabTemplate from "../../components/templates/DialogTemplate/AddNewTabTemplate";
import ButtonAtom from "../../components/atoms/Button/ButtonAtom";

describe("<Tabs/>", () => {
  let mounted;
  const onChange = jest.fn();
  beforeEach(() => {
    act(() => {
      mounted = mount(<Tabs onChange={onChange} tabLabels={["tab 1"]} addTrustGroup={()=>{}} handleClose={()=>{}} handleClickOpen={()=>{}}/>);
    });
  });

  it("Renders correctly", () => {
    let wrapper;
    wrapper = renderer.create(<Tabs />);
    expect(wrapper).toMatchSnapshot();
  });
  it("Tab onChange works", () => {
    mounted.find("span").at(0).props().onClick();
    expect(onChange).toHaveBeenCalled();
  });
  it('new tab add', () => {
    mounted.find(AddNewTabTemplate).at(0).props().onAddClick("Top 100");
    mounted.find(AddNewTabTemplate).at(0).props().handleClose();
  });
  it('open a tab', () => {
    mounted.find(ButtonAtom).at(0).props().onClick();
  });
});
