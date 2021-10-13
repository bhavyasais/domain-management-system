import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { TextField } from "@material-ui/core";
import AddNewDeptTemplate from "../../components/templates/DialogTemplate/AddNewDeptTemplate";

describe("<AddNewTabTemplate/>", () => {
  let mounted;
  const handleClose = jest.fn();
  const onAddClick = jest.fn();

  beforeEach(() => {
    act(() => {
      mounted = mount(
        <AddNewDeptTemplate
          handleClose={handleClose}
          onAddClick={onAddClick}
          open={true}
        />
      );
    });
  });

  it("Renders correctly", () => {
    let wrapper;
    wrapper = renderer.create(
      <AddNewDeptTemplate
        handleClose={() => {}}
        onConAddClicklick={() => {}}
        open={false}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('handles the change', () => {
    const wrapper = mount(
      <AddNewDeptTemplate onClick={onAddClick} handleClose={handleClose} onAddClick={onAddClick} open={true} onChange={onAddClick}/>,
    );
    wrapper.find('ButtonAtom').at(1).props().onClick();
    wrapper.find(TextField).at(0).props().onChange({target:{value:"abc"}});
  });
});
