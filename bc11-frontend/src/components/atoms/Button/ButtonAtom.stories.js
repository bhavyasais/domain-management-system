import React from "react";
import { storiesOf } from "@storybook/react";
import ButtonAtom from "./ButtonAtom";
import { text ,boolean} from "@storybook/addon-knobs";

storiesOf("Atoms/Button", module).add("Contained Button", () => (
  <ButtonAtom
    variant={text("Button Variant","contained")}
    value={text("Text", "Add")}
    // color={color("Color","#1d4cd7")}
    //textVariant={text("Typography Variant","h4")}
    onClick={() => console.log("Button clicked")}
    disabled={boolean('Disabled', false)}
    maxWidth="100px"
    disableRipple
  />));
