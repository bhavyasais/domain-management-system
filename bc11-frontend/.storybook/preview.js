import theme from "../src/theme";
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";

export const parameters = {
  options: {
    storySort: {
      order: [],
      method: "alphabetic",
      locales: "",
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <div style={{ margin: "1em" }}>
        <Story />
      </div>
    </ThemeProvider>
  ),
];
