import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import Tabs from "./Tabs";
import DomainGrid from "../../organisms/DomainGrid/DomainGrid";
import {
  DomainrowData,
  trustGroupcolumnDefs,
  trustGrouprowData,
} from "../../../utils/commandCentermockData";
import DataGrid from "../../molecules/DataGrid/DataGrid";
const trustGroups = ["Top 100", "Top 1000", "Top 3000", "Do not trust"];

export default {
  component: Tabs,
  title: "Templates/Tabs",
  decorators: [withKnobs],
};

export const defaulTabs = () => (
  <Tabs
    tabLabels={[
      "Top 100",
      "Top 1000",
      "External partners",
      "Box communication base",
    ]}
    // contentArray={[domainGroup(), domainGroup(), domainGroup(), trustGroup()]}

    contentArray={[
      <DomainGrid rowData={DomainrowData} trustGroups={trustGroups} />,
      <DomainGrid rowData={DomainrowData} trustGroups={trustGroups} />,
      <DomainGrid rowData={DomainrowData} trustGroups={trustGroups} />,
      <DataGrid
        columnDefs={trustGroupcolumnDefs}
        rowData={trustGrouprowData}
      />,
    ]}
  />
);