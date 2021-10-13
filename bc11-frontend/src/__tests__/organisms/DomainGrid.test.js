import React from 'react';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import DomainGrid from '../../components/organisms/DomainGrid/DomainGrid';
import { TRUST_GROUPS } from '../../utils/Strings';
import ButtonAtom from '../../components/atoms/Button/ButtonAtom';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
describe('DomainGrid', () => {
  var component;
  const jestFunction = jest.fn();
  beforeEach(() => {
    act(() => {
      component = mount(
        <DomainGrid
          onClick={jestFunction}
          trustGroups={TRUST_GROUPS}
          setSelectedRows={jestFunction}
          setTotalRows={jestFunction}
          list={[]}
          updateDomain={jestFunction}
        />,
      );
    });
  });
  it('should render correctly', () => {
    let wrapper;
    wrapper = renderer.create(
      <DomainGrid
        trustGroups={TRUST_GROUPS}
        setSelectedRows={() => {}}
        setTotalRows={() => {}}
        deptID={0}
        index={0}
        list={[]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('ag grid react test', () => {
    component.find(ButtonAtom).at(0).props().onClick();
    component.find(AgGridReact).at(0).props().onGridReady({params:{api:"abc"}});
    component.find(AgGridReact).at(0).props().onCellEditingStopped({column:{colId:"abc"}});
  });
});
