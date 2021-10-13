import React from "react";
import Chip from "./Chip";
import { withKnobs, text, select, color } from "@storybook/addon-knobs";

export default {
  component: Chip,
  title: "Atoms/Chip",
  decorators: [withKnobs],
};

export const defaultChip = ({ classes }) => (
  <Chip
    label={text("label", "1000")}
    backgroundColor={color("backgroundColor", "#ffada5")}
    color={color("color", "black")}
    variant={select("variant", ["default", "outlined"], "default")}
  />
);
