const { setWorldConstructor, Before, After, Status } = require('@cucumber/cucumber');
const { AllureRuntime, CucumberJSAllureFormatter } = require('allure-cucumberjs');
const { chromium } = require('playwright');

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.allureRuntime = new AllureRuntime({ resultsDir: 'allure-results' });
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});
