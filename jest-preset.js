"use strict";

const path = require("path");

module.exports = {
  globalSetup: path.resolve(__dirname, "lib", "spec-setup.js"),
  globalTeardown: path.resolve(__dirname, "lib", "spec-teardown.js"),
  verbose: true,
  projects: [
    {
      displayName: "Spec",
      preset: "jest-puppeteer",
      globals: {
        PATH: "http://127.0.0.1:8080"
      },
      testRegex: "/src/test/.*\\.spec\\.js$",
      testEnvironment: path.resolve(__dirname, "lib", "spec-environment.js")
    },
    {
      displayName: "JS Unit",
      testRegex: "/src/test/.*\\.unit\\.js$",
      testEnvironment: path.resolve(__dirname, "lib", "unit-environment.js")
    },
    {
      displayName: "TS Unit",
      preset: 'ts-jest',
      globals: {
        'ts-jest': {
          'diagnostics': {
            'ignoreCodes': [
              'TS151001'
            ]
          }
        }
      },
      testRegex: "/src/test/.*\\.unit\\.ts$"
    }
  ]
};
