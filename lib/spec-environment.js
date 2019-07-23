const PuppeteerEnvironment = require("jest-environment-puppeteer");

module.exports = class extends PuppeteerEnvironment {
  async setup() {
    await super.setup();

    const page = this.global.page = await this.global.browser.newPage();

    this.global.SetupTest = (path) => async () => {
      await page.goto(`${this.global.PATH}/${path}`, { waitUntil: "networkidle0" });
    }

    this.global.SetupElement = (selector) => async () => {
      this.global.element = await this.global.page.$(selector);
    }
  }
}
