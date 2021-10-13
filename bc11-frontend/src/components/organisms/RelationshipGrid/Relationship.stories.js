import React from "react";
import { RelationshipData } from "../../../utils/commandCentermockData";
import RelationshipGrid from "./RelationshipGrid";

export default {
  title: "Organisms/RelationshipGrid",
};

export const TopGrid = () => {
  return <RelationshipGrid rowData={RelationshipData} />;
};
