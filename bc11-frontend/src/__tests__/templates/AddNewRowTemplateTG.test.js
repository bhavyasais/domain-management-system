import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import AddNewRowTemplateTG from '../../components/templates/DialogTemplate/AddNewRowTemplateTG';
import { TextField } from '@material-ui/core';

describe('<AddNewRowTemplateTG/>', () => {
  let mounted;
  const handleClose = jest.fn();
  const onAddClick = jest.fn();

  beforeEach(() => {
    act(() => {
      mounted = mount(
        <AddNewRowTemplateTG
          handleClose={handleClose}
          onAddClick={onAddClick}
          open={true}
          onChange={onAddClick}
        />,
      );
    });
  });

  it('Renders correctly', () => {
    let wrapper;
    wrapper = renderer.create(<AddNewRowTemplateTG />);
    expect(wrapper).toMatchSnapshot();
  });
  it('handles the change', () => {
    const wrapper = mount(
      <AddNewRowTemplateTG onClick={onAddClick} handleClose={handleClose} onAddClick={onAddClick} open={true} onChange={onAddClick}/>,
    );
    wrapper.find('ButtonAtom').at(1).props().onClick();
    wrapper.find(TextField).at(0).props().onChange({target:{value:"abc"}});
    wrapper.find(TextField).at(1).props().onChange({target:{value:"abc"}});
    wrapper.find(TextField).at(2).props().onChange({target:{value:"abc"}});
  });
});
