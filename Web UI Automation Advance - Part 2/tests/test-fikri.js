import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';
import chrome from 'selenium-webdriver/chrome.js';

import fs from 'fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import modul_login from '../modul/modul_login.js';
import modul_filter_nama_za from '../modul/modul_filter_nama_za.js';

describe('Google Search Test', function () {
    let driver;

    it('Test Case 1', async function () {
        let options = new chrome.Options();
        driver = await new Builder().forBrowser('chrome').build();

        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();

        assert.strictEqual(title, 'Swag Labs');

        let inputUsernamePOM = await driver.findElement(modul_login.inputUsername)
        let inputPasswordPOM = await driver.findElement(modul_login.inputPassword)
        let buttonLoginPOM = await driver.findElement(modul_login.buttonLogin)
        await inputUsernamePOM.sendKeys('standard_user')
        await inputPasswordPOM.sendKeys('secret_sauce')
        await buttonLoginPOM.click();

        await driver.quit();
    })

    it('Test Case 2', async function () {
        let options = new chrome.Options();
        driver = await new Builder().forBrowser('chrome').build();

        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();

        assert.strictEqual(title, 'Swag Labs');

        let inputUsernamePOM = await driver.findElement(modul_login.inputUsername)
        let inputPasswordPOM = await driver.findElement(modul_login.inputPassword)
        let buttonLoginPOM = await driver.findElement(modul_login.buttonLogin)
        await inputUsernamePOM.sendKeys('standard_user')
        await inputPasswordPOM.sendKeys('secret_sauce')
        await buttonLoginPOM.click();
        await driver.wait(until.urlContains('inventory.html'), 5000);

        let dropdownPOM = await driver.wait(until.elementLocated(modul_filter_nama_za.dropdown), 5000);
        await dropdownPOM.sendKeys('za');

        await driver.quit();
    });

     it('Screenshot', async function () {
        let options = new chrome.Options();
        driver = await new Builder().forBrowser('chrome').build();

        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();

        let inputUsernamePOM = await driver.findElement(modul_login.inputUsername)
        let inputPasswordPOM = await driver.findElement(modul_login.inputPassword)
        let buttonLoginPOM = await driver.findElement(modul_login.buttonLogin)
        await inputUsernamePOM.sendKeys('standard_user')
        await inputPasswordPOM.sendKeys('secret_sauce')
        await buttonLoginPOM.click();
        await driver.wait(until.urlContains('inventory.html'), 5000);

        let ss_full = await driver.takeScreenshot();
        fs.writeFileSync("full_screenshot.png", Buffer.from(ss_full, "base64"));

        let dropdownPOM = await driver.wait(until.elementLocated(modul_filter_nama_za.dropdown), 5000);
        await dropdownPOM.sendKeys('za');

        let ss_dropdown = await dropdownPOM.takeScreenshot();
        fs.writeFileSync("dropdown.png", Buffer.from(ss_dropdown, "base64"));

        await driver.quit();
    })

    it('Cek Visual halaman login', async function () {
        // visit page
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://www.saucedemo.com');

        const title = await driver.getTitle();
        assert.strictEqual(title, 'Swag Labs');

        // screenshot keadaan login page sekarang, current.png
        let screenshot = await driver.takeScreenshot();
        let imgBuffer = Buffer.from(screenshot, "base64");
        fs.writeFileSync("current.png", imgBuffer);

        // ambil baseline untuk komparasi
        // jika belum ada baseline, jadikan current.png sebagai baseline
        if (!fs.existsSync("baseline.png")) {
            fs.copyFileSync("current.png", "baseline.png");
            console.log("Baseline image saved.");
        }

        // Compare baseline.png dan current.png apakah sama
        let img1 = PNG.sync.read(fs.readFileSync("baseline.png"));
        let img2 = PNG.sync.read(fs.readFileSync("current.png"));
        let { width, height } = img1;
        let diff = new PNG({ width, height });

        let numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

        fs.writeFileSync("diff.png", PNG.sync.write(diff));

        if (numDiffPixels > 0) {
            console.log(`Visual differences found! Pixels different: ${numDiffPixels}`);
        } else {
            console.log("No visual differences found.");
        }

        driver.quit()
    })

});