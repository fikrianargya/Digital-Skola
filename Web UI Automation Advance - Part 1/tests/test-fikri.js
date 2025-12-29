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

    it('Login dengan input Username dan Password', async function () {
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'));
        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();
    })

    it('Cek Filter Nama Z to A', async function () {
        await driver.wait(until.urlContains('inventory.html'), 5000);
        const dropdown = await driver.wait(until.elementLocated(By.css('[data-test="product-sort-container"]')), 5000);
        const select = new Select(dropdown);
        await select.selectByValue('za');
    })
});
