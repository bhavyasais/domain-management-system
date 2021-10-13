import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import SideNavigationBar from "./SideNavigationBar";

export default {
  component: SideNavigationBar,
  title: "Molecules/SideNavigationBar",
  decorators: [withKnobs],
};

export const defaultSideNavBar = () => (
  <SideNavigationBar header={text("header", "io")} />
);
