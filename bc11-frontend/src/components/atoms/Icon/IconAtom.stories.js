import React from "react";
import { storiesOf } from "@storybook/react";
import IconAtom from "./IconAtom";
import { select } from "@storybook/addon-knobs";
import options from "../shared/ListIcons";

storiesOf("Atoms/Icon", module).add("Icon", () => (
  <IconAtom
    color="#949494"
    icon={
      options[
        select(
          "Icon",
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
            "close",
          ],
          "search"
        )
      ]
    }
  />
));
