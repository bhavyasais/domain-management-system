import React from "react";
import { mount } from "enzyme";
import DataGrid from "../../components/molecules/DataGrid/DataGrid";
import {
  DomaincolumnDefs,
  DomainrowData,
} from "../../utils/commandCentermockData";

describe("<DataGrid/>", () => {
  it("Renders correctly", () => {
    let wrapper;
    wrapper = mount(
      <DataGrid rowData={DomainrowData} columnDefs={DomaincolumnDefs} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
