import Department from '../../components/molecules/Department/DepartmentsAdd';
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

describe('Department', () => {
  let component;
  const handleClick = jest.fn();
  beforeEach(() => {
    act(() => {
      component = mount(<Department onClick={handleClick} />);
    });
  });
  it('Renders correctly', () => {
    let wrapper = renderer.create(<Department />);
    expect(wrapper).toMatchSnapshot();
  });

  it('opens the modal', () => {
    const wrapper = mount(
      <Department
        onClick={handleClick}
        onAddClick={() => {}}
        addDepartment={() => {}}
        currentDept={{ name: 'Sales' }}
        dept={[{ name: 'Sales' }]}
        isOpen={true}
        setCurrentDepartment={() => {}}
        deleteSelectedRow={0}
      />,
    );
    wrapper.find('div').at(1).prop('onClick')();
    wrapper.find('AddNewDeptTemplate').at(0).props().handleClose();
    wrapper.find('AddNewDeptTemplate').at(0).props().onAddClick();
    expect(wrapper).toMatchSnapshot();
  });
});
