const Page = require("./page");
class LoginPage extends Page {
  get inputUsername() {
    return $("//input[@name='Email']");
  }

  get inputPassword() {
    return $("//input[@name='Password']");
  }

  get btnSignIn() {
    return $("//span[text()='Sign in']/../..");
  }

  get errorMessageText() {
    return $("//div[@id='root']//section//form/div[7]/div");
  }

  get loginFormSection() {
    return $("//div[@id='root']//section");
  }

  async enterUsername(username) {
    await this.inputUsername.waitForDisplayed();
    await this.inputUsername.setValue(username);
  }

  async enterPassword(password) {
    await this.inputPassword.waitForDisplayed();
    await this.inputPassword.setValue(password);
  }

  async clickOnSignInButton() {
    await this.btnSignIn.waitForClickable();
    await this.btnSignIn.click();
  }
}

module.exports = new LoginPage();
