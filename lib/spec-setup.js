"use strict";

const { createServer } = require("http-server");

module.exports = async () => {
  if (global.__SERVER__) {
    return;
  }

  const addressInfo = await getAddressInfo();

  global.__HOST__ = addressInfo.address;
  global.__PORT__ = addressInfo.port;

  global.__SERVER__ = createServer({
    slient: true,
    proxy:  `http://${global.__HOST__}:${global.__PORT__}/node_modules`
  });

  return new Promise((resolve) => {
    global.__SERVER__.listen(global.__PORT__, global.__HOST__, () => {
      resolve();
    });
  });
};

/**
  * This function gets a random port from the OS, to allow parallel testing to take place when using this preset across
  * multiple projects simultaneously.
  */
function getAddressInfo() {
  return new Promise((resolve) => {
    const server = require("http").createServer();

    server.listen(0, "localhost", () => {
      const addressInfo = server.address();
      server.close();
      return resolve(addressInfo);
    });
  })
}
