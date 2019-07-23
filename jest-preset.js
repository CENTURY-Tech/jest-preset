"use strict";

const path = require("path");

module.exports = {
  projects: [
    {
      displayName: "Spec",
      preset: "./node_modules/jest-puppeteer/jest-preset.json",
      globals: {
        PATH: "http://127.0.0.1:8080"
      },
      testRegex: "/src/test/.*\\.spec\\.js$",
      testEnvironment: path.resolve(__dirname, "lib", "spec-environment.js")
    },
    {
      displayName: "Unit",
      testRegex: "/src/test/.*\\.unit\\.js$",
      testEnvironment: path.resolve(__dirname, "lib", "unit-environment.js")
    }
  ],
  verbose: true
};
