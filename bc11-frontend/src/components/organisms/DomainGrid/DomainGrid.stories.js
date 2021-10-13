import React from "react";
import { DomainrowData } from "../../../utils/commandCentermockData";
import DomainGrid from "./DomainGrid";

export default {
  title: "Organisms/DomainGrid",
};

const trustGroups = ["Top 100", "Top 1000", "Top 3000", "Do not trust"];

export const domainGroup = () => {
  return <DomainGrid rowData={DomainrowData} trustGroups={trustGroups} />;
};
