"use strict";

const { createServer } = require("http-server");

module.exports = async () => {
  if (global.__SERVER__) {
    return;
  }

  global.__SERVER__ = createServer({
    slient: true,
    proxy: "http://127.0.0.1:8080/node_modules"
  });

  return new Promise((resolve) => {
    global.__SERVER__.listen(8080, "127.0.0.1", () => {
      resolve();
    });
  });
};

module.exports();
