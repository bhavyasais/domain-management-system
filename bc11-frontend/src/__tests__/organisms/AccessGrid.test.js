import React from 'react';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { TRUST_GROUPS } from '../../utils/Strings';
import ButtonAtom from '../../components/atoms/Button/ButtonAtom';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import AccessGrid from '../../components/organisms/AccessGrid/AccessGrid';
describe('AccessGrid', () => {
  var component;
  const jestFunction = jest.fn();
  beforeEach(() => {
    act(() => {
      component = mount(
        <AccessGrid
          onClick={jestFunction}
          trustGroups={TRUST_GROUPS}
          setSelectedRows={jestFunction}
          setTotalRows={jestFunction}
          deptID={0}
          index={0}
        />,
      );
    });
  });
  it('should render correctly', () => {
    let wrapper;
    wrapper = renderer.create(
      <AccessGrid
        trustGroups={TRUST_GROUPS}
        setSelectedRows={() => {}}
        setTotalRows={() => {}}
        deptID={0}
        index={0}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
    it('ag grid react test', () => {
      component.find(AgGridReact).at(0).props().onGridReady({params:{api:"abc"}});
      component.find(AgGridReact).at(0).props().getRowHeight(()=>{});
    });
});
