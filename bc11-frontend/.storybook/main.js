const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.[tj]s"],
  addons: ["@storybook/addon-knobs"],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });
    return config;
  },
};
