

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { chromium } = require('playwright');
const fs = require('fs');
const csv = require('csv-parse/lib/sync');

let browser, context, page;

Given('I open the Sauce Demo website', async function () {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://www.saucedemo.com/');
});

When('I login with userID {string} and password {string}', async function (userID, password) {
  await page.fill('#user-name', userID);
  await page.fill('#password', password);
  await page.click('#login-button');
});

Then('I add items to the cart from CSV {string}', async function (csvFilePath) {
    const content = fs.readFileSync(csvFilePath, 'utf-8');
    const records = csv(content, { columns: true });
    this.items = records.map(record => record.items);
    console.log(this.items)
    for (const item of this.items) {
      // Finding an element using XPath
      console.log(item)
      const element = await page.locator('//div[contains(text(), "' + item + '")]//following::button', { timeout: 10000 }).first();

      // Clicking on the found element
      await element.click();
    }
});

Then('I verify all items are present on the landing page', async function () {
  
  for (const item of this.items) {
    // Finding an element using XPath
    const element = await page.locator('//div[contains(text(), "' + item + '")]').first();
    if (element.length > 0) {
      console.log('Element is present');
    } else {
      console.log('Element is not present');
    }

  }

});

Then('I go to the cart', async function () {
  const element = page.locator('//*[@id="shopping_cart_container"]/a');

  if (element) {
    await element.hover(); // Move the mouse cursor to the button
    await element.click(); // Perform the click action
  } else {
    console.error('element not found');
  }

  //await page.goto('https://www.saucedemo.com/cart.html');
});

Then('I remove {string} from the cart', async function (item) {
  const element = await page.locator('//div[contains(text(), "' + item + '")]//following::button', { timeout: 10000 }).first();
  await element.click();
});

Then('I click "Checkout"', async function () {
  await page.click('#checkout');

});

Then('I provide the customer information {string}, {string}, {string}', async function (firstName, lastName, zipCode) {
  await page.fill('#first-name', firstName);
  await page.fill('#last-name', lastName);
  await page.fill('#postal-code', zipCode);


});

Then('I click "Continue"', async function () {
  await page.click('#continue');

});

Then('I remove {string} from the checkout', async function (item) {
  const productLocator = `text=${item}`;
  await page.click(`${productLocator} >> xpath=../..//button[contains(text(), 'Remove')]`);
});

Then('I check the total price and click "Finish" if total is less than $40.00 else click "Cancel"', async function () {
  const totalLocator = '.summary_total_label';
  const totalText = await page.textContent(totalLocator);
  console.log(totalText)
  const total = parseFloat(totalText.replace('Total: $', ''));
  console.log(total)
  if (total < 40.00) {
    await page.click('#finish');
  } else {
    await page.click('#cancel');
  }
});

Then('I should see the confirmation message {string}', async function (message) {
  const confirmationLocator = '.complete-header';
  const confirmationText = await page.textContent(confirmationLocator);
  expect(confirmationText).to.equal(message);
});

Then('I click "Back Home"', async function () {
  await page.click('#back-to-products');
});

Then('I logout from the webapp', async function () {
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
  await browser.close();
});



