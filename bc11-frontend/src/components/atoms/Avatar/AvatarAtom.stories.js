import React from "react";
import { storiesOf } from "@storybook/react";
import AvatarAtom from "./AvatarAtom";

storiesOf("Atoms/Avatar", module).add("Avatar", () => (
  <AvatarAtom
    src={
      "https://cdn.zeplin.io/5fa102170abc4fbe7467eaa5/screens/438d5cb7-5113-4c26-9a9f-109b56acf94c.png"
    }
  />
));
