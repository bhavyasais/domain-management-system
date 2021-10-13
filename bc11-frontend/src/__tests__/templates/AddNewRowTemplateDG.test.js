import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import AddNewRowTemplateDG from '../../components/templates/DialogTemplate/AddNewRowTemplateDG';
import { TextField } from '@material-ui/core';

describe('<AddNewRowTemplateDG/>', () => {
  let mounted;
  const handleClose = jest.fn();
  const onAddClick = jest.fn();

  beforeEach(() => {
    act(() => {
      mounted = mount(
        <AddNewRowTemplateDG handleClose={handleClose} onAddClick={onAddClick} open={true} onChange={onAddClick} onClick={onAddClick}/>,
      );
    });
  });

  it('Renders correctly', () => {
    let wrapper;
    wrapper = renderer.create(
      <AddNewRowTemplateDG handleClose={() => {}} onAddClick={() => {}} open={false} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('handles the change', () => {
    const wrapper = mount(
      <AddNewRowTemplateDG
        onClick={onAddClick}
        handleClose={handleClose}
        onAddClick={onAddClick}
        open={true}
        onChange={onAddClick}
      />,
    );
    wrapper.find('ButtonAtom').at(1).props().onClick();
    wrapper.find(TextField).at(0).props().onChange({target:{value:"abc"}});
    wrapper.find(TextField).at(1).props().onChange({target:{value:"abc"}});
    wrapper.find(TextField).at(2).props().onChange({target:{value:"abc"}});
  });
});
