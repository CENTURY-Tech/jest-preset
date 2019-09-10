const PuppeteerEnvironment = require("jest-environment-puppeteer");

module.exports = class extends PuppeteerEnvironment {
  async setup() {
    await super.setup();

    this.global.page = await this.global.browser.newPage();

    this.global.SetupTest = (path, selector) => async () => {
      // Navigate to the path provided and wait for the imports to resolve
      await this.global.page.goto(`${this.global.PATH}/${path}`, { waitUntil: "networkidle0" });

      // Wait for the target element to have been registed
      await this.global.page.waitForFunction(`(window.element = document.querySelector("${selector}")) && element.is`);

      this.global.element = await this.global.page.$(selector);
    }
  }
}
