import React from "react";
import { storiesOf } from "@storybook/react";
import IconButtonAtom from "./IconButtonAtom";
import { select } from "@storybook/addon-knobs";

import options from "../shared/ListIcons";

storiesOf("Atoms/IconButton", module).add("Icon Buttons", () => (
  <IconButtonAtom
    color="#949494"
    icon={
      options[
        select(
          "IconButton",
          [
            "search",
            "pie",
            "chart",
            "settings",
            "delete",
            "list",
            "filter",
            "sort",
            "more",
          ],
          "search"
        )
      ]
    }
  />
));
