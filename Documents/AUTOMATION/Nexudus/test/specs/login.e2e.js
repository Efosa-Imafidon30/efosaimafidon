const LoginPage = require("../pageobjects/login.page");
var { expect } = require("chai");
const { faker } = require("@faker-js/faker");

describe("My Login application", () => {
  before(async () => {
    await LoginPage.open();
  });

  it("log-in page shows a clear error message when invalid details are provided", async () => {
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
    await LoginPage.clearElement(usernameField);
    await usernameField.setValue("adrian+1004930927@nexudus.com");
    await passwordField.click();
    await LoginPage.clearElement(passwordField);
    await passwordField.setValue("i0i1lgVD8OK8");
    await LoginPage.clickOnSignInButton();
    const sideBarDashboardButton = await LoginPage.sideBarDashboardButton;
    await browser.waitUntil(
      async () => (await sideBarDashboardButton.isDisplayed()) == true
    );
    expect(await browser.getUrl()).to.contain("dashboards/now");
  });

  it("Can add and delete a product from the products list", async () => {
    const url = await browser.getUrl();
    const productsUrl = url.replace("/dashboards/now", "/billing/products");
    await browser.url(productsUrl);
    await LoginPage.clickOnAddProductButton();
    await LoginPage.openManualEntryForm();
    const nameOfProduct = faker.lorem.word({
      length: { min: 5, max: 7 },
    });
    await LoginPage.enterProductName(nameOfProduct);
    await LoginPage.enterProductDescription(faker.lorem.words());
    await LoginPage.enterCurrencyUnit(10);
    await LoginPage.clickOnProductSaveButton();
    await LoginPage.searchForAProduct(nameOfProduct);
    const productName = await LoginPage.productName;
    expect(nameOfProduct).to.eq(await productName.getText());
    await LoginPage.deleteFirstProduct();
    await browser.refresh();
    await LoginPage.searchForAProduct(nameOfProduct);
    await LoginPage.confirmProductDeletion();
  });
});
