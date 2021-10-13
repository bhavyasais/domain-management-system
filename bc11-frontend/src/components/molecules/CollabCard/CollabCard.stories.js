import React from "react";
import CollabCard from "./CollabCard"; // This is our component
import { storiesOf } from "@storybook/react";
import Card from "@material-ui/core/Card";
import {select} from '@storybook/addon-knobs';
import box from "../../../assets/atoms_icons_box.svg";
import gsuite from "../../../assets/g-suite.jpg";
import okta from "../../../assets/atoms_icons_okta.svg";

const options = {
  box: (
    <CollabCard
      title="box card"
      image={box}
      component="img"
      height="200"
      name="Box"
    />
  ),
  gsuite: (
    <CollabCard
      title="g suite card"
      image={gsuite}
      component="img"
      height="200"
      name="Google Suite"
    />
  ),
  docu: (
    <CollabCard
      title="docu sign card"
      image="https://documentautomation.net/wp-content/uploads/2016/05/docusign-circle-large.png"
      component="img"
      height="200"
      name="Docusign"
    />
  ),
  figma: (
    <CollabCard
      title="figma card"
      image="https://cdn.worldvectorlogo.com/logos/figma-1.svg"
      component="img"
      height="200"
      name="Figma"
    />
  ),
  okta: (
    <CollabCard
      title="okta card"
      image={okta}
      component="img"
      height="200"
      name="Okta"
    />
  ),
  slack: (
    <CollabCard
      title="slack card"
      image="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
      component="img"
      height="200"
      name="Slack"
    />
  ),
};

storiesOf("Molecules/Cards", module).add("All Cards", () => (
  <Card children={options[select("Card", ["box", "gsuite","docu","figma","okta","slack"], options.box)]}  />
));
