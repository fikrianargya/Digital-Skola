const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { Select } = require('selenium-webdriver/lib/select');

describe('Google Search Test', function () {
    let driver;

    it('Visit SauceDemo  dan cek page title', async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://www.saucedemo.com/');

        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await buttonLogin.click()
        await driver.wait(until.urlContains('inventory.html'),5000);  

        const dropdown = await driver.wait(until.elementLocated(By.css('[data-test="product-sort-container"]')), 5000);

        const select = new Select(dropdown);
        await select.selectByValue('za');

        await driver.quit();
    })
});