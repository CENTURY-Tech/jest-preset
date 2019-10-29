"use strict";

const fs = require("fs");
const vm = require("vm");
const JSDomEnvironment = require("jest-environment-jsdom");

module.exports = class extends JSDomEnvironment {
  async setup() {
    await super.setup();

    this.global.ES5Prop = ES5Prop;
    this.global.ES5Call = ES5Call;

    this.global.ImportScript = (path) => {
      return super.runScript(new vm.Script(fs.readFileSync(path, "utf8")));
    };
  }
}

function ES5Call(obj, prop) {
  return (...args) => ES5Prop(obj, prop).apply(obj.prototype, args);
}

function ES5Prop(obj, prop) {
  return obj.prototype[prop];
}
