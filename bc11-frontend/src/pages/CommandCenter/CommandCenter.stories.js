import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import CommandCenter from "./CommandCenter";
export default {
  component: CommandCenter,
  title: "Templates/CommandCenter",
  decorators: [withKnobs],
};

export const CommandCenterPage = () => <CommandCenter />;
