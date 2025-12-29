const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { Select } = require('selenium-webdriver/lib/select');

describe('Google Search Test', function () {
    let driver;

    before(async function () {
        console.log('before() hook');
        driver = await new Builder().forBrowser('chrome').build();
    })

    after(async function () {
        console.log('after() hook');
        await driver.quit();;
    })

    it('Visit SauceDemo dan cek page title', async function () {
        await driver.get('https://www.saucedemo.com/');
        const title = await driver.getTitle();
    })

    it('Input Username', async function () {
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
        await inputUsername.sendKeys('standard_user');
    })

    it('Input Password', async function () {
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
        await inputPassword.sendKeys('secret_sauce');
    })

    it('Klik Login', async function () {
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'));
        await buttonLogin.click();
    })

    it('Filter Nama Z to A', async function () {
        await driver.wait(until.urlContains('inventory.html'), 5000);
        const dropdown = await driver.wait(until.elementLocated(By.css('[data-test="product-sort-container"]')), 5000);
        const select = new Select(dropdown);
        await select.selectByValue('za');
    })

});
