import React from "react";
import { storiesOf } from "@storybook/react";
import Topbar from "./Topbar";
import {text} from "@storybook/addon-knobs";

storiesOf("Organisms/Top Navigation Bar", module).add("Top Navigation Bar", () => (
  <Topbar label = {text("Label", "Centralized  Communication Command Center")} />
));
