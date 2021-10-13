import React from "react";
import {
  DomainrowData,
  DomaincolumnDefs,
} from "../../../utils/commandCentermockData";
import DataGrid from "./DataGrid";

export default {
  title: "Molecules/Grid",
};

export const domainGroup = () => {
  return <DataGrid columnDefs={DomaincolumnDefs} rowData={DomainrowData} />;
};
