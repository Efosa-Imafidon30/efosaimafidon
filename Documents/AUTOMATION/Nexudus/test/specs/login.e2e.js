const LoginPage = require("../pageobjects/login.page");
var { expect } = require("chai");

describe("My Login application", () => {
  before(async () => {
    await LoginPage.open();
  });

  it.only("log-in page shows a clear error message when invalid details are provided", async () => {
    const loginForm = await LoginPage.loginFormSection;
    await browser.waitUntil(
      async () => (await loginForm.isDisplayed()) == true
    );
    await LoginPage.enterUsername("bad@example.com");
    await LoginPage.enterPassword("badpassword");
    await LoginPage.clickOnSignInButton();
    const errorMessage = await LoginPage.errorMessageText;

    await browser.waitUntil(async () => (await errorMessage.getText()) !== "");
    expect(await errorMessage.isDisplayed()).to.be.true;
    expect(await errorMessage.getText()).to.eq(
      "The email or password is incorrect."
    );
  });

  it("Log-in page logs user in when valid details are provided", async () => {
    const usernameField = await LoginPage.inputUsername;
    const passwordField = await LoginPage.inputPassword;
    await usernameField.clearValue();
    await usernameField.setValue("adrian+1004930927@nexudus.com");
    await passwordField.clearValue();
    await passwordField.setValue("A8Pd6m16YfJt");
    await LoginPage.clickOnSignInButton();
  });

  it("Can add and delete a product from the products list", async () => {
    /**
     * Login details not working
     */
  });
});
