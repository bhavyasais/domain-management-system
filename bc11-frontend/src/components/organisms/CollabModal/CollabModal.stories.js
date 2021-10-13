import React from "react";
import CollabModal from "./CollabModal"; // This is our component
import { storiesOf } from "@storybook/react";
import CloseIcon from "@material-ui/icons/Close";
import options from "../../atoms/shared/ListIcons";

const icons={
  close : <CloseIcon/>,
};
storiesOf("Organisms/CollabModal", module).add("Collab Modal", () => (
  <CollabModal icon={options.close}/>
));
