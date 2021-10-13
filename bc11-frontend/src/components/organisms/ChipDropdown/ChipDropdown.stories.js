import React from "react";
import ChipDropdown from "./ChipDropdown";
import { UpdateTrustGroups } from "../../../utils/helper";

export default {
  title: "Molecules/ComponentDropDown",
};

const trustGroups = ["Top 100", "Top 1000", "Top 3000", "Do not trust"];
const formattedTrustGroups = UpdateTrustGroups(trustGroups);

const onChange = () => {};

export const ComponentDropDown = () => {
  return (
    <ChipDropdown list={formattedTrustGroups} onDropDownChange={onChange} />
  );
};
