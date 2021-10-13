import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import AccessPanel from "./AccessPanel";
import AppBanner from "../../molecules/AppBanner/AppBanner";

export default {
  component: AccessPanel,
  title: "Templates/AccessPanel",
  decorators: [withKnobs],
};

export const defaultAccessPanel = () => (
  <AccessPanel>
    <AppBanner />
  </AccessPanel>
);
