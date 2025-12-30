import { By } from "selenium-webdriver";

class ModulLogin{
    static inputUsername = By.css('[data-test="username"]');
    static inputPassword = By.xpath('//*[@data-test="password"]');
    static buttonLogin = By.className('submit-button btn_action');
}

export default ModulLogin;






// it('Login dengan input Username dan Password', async function () {
//         let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
//         let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
//         let buttonLogin = await driver.findElement(By.className('submit-button btn_action'));
//         await inputUsername.sendKeys('standard_user');
//         await inputPassword.sendKeys('secret_sauce');
//         await buttonLogin.click();
//     })