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

  get sideBarDashboardButton() {
    return $("//span[text()='Dashboard']/../..");
  }

  get addProductButton() {
    return $("//span[text()='Add product']/../..");
  }

  get manualEntry() {
    return $("//button[text()='Manual entry']");
  }

  get productNameField() {
    return $("//label[text()='Product name']/../..//input");
  }

  get productDescriptionField() {
    return $("//label[text()='Product description']/../../div[2]//textarea");
  }

  get priceUnitButton() {
    return $("//input[@data-test-subj='product_Price']");
  }

  get productFormSaveButton() {
    return $("//*[text()='Save changes']/..");
  }

  get searchField() {
    return $("//input[@placeholder='Type to search by name']");
  }

  get firstCheckbox() {
    return $(
      "//caption[contains(text(), 'This table contains')]/../tbody/tr[1]/td[1]/div"
    );
  }

  get productName() {
    return $("//div[text()='Name']/../../../tr[1]/td[2]//strong");
  }

  get deleteRecordButton() {
    return $("//span[text()='Delete 1 record']/..");
  }

  get confirmDeleteButton() {
    return $("//span[text()='Yes, do it']/..");
  }

  get noResultText() {
    return $("//span[text()='No items found']");
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

  async clearElement(element) {
    let values = await element.getValue();
    while ((await values.length) > 0) {
      await element.click();
      await browser.keys(["Control", "A", "Control"]);
      await browser.keys("Backspace");
      console.log(values.length);
      let value = await element.getValue();
      if (value.length == 0) {
        break;
      }
    }
  }

  async clickOnAddProductButton() {
    const addProduct = await this.addProductButton;
    await addProduct.waitForClickable();
    await addProduct.click();
  }

  async openManualEntryForm() {
    const manualEntry = await this.manualEntry;
    await manualEntry.waitForDisplayed();
    await manualEntry.click();
  }

  async enterProductName(name) {
    const productName = await this.productNameField;
    await productName.setValue(name);
  }

  async enterProductDescription(description) {
    const productDescription = await this.productDescriptionField;
    await productDescription.setValue(description);
  }

  async enterCurrencyUnit(value) {
    const currencyUnit = await this.priceUnitButton;
    await currencyUnit.click();
    await browser.pause(1000);
    await currencyUnit.addValue(value);
  }

  async clickOnProductSaveButton() {
    await this.productFormSaveButton.click();
  }

  async searchForAProduct(productName) {
    const searchBar = await this.searchField;
    await searchBar.waitForClickable();
    await searchBar.click();
    await searchBar.clearValue();
    await searchBar.setValue(productName);
  }

  async deleteFirstProduct() {
    const firstCheckbox = await this.firstCheckbox;
    await firstCheckbox.waitForClickable();
    await firstCheckbox.click();
    const deleteButton = await this.deleteRecordButton;
    await deleteButton.waitForClickable();
    await deleteButton.click();
    const confirmDeleteButton = await this.confirmDeleteButton;
    await confirmDeleteButton.waitForClickable();
    await confirmDeleteButton.click();
    await this.confirmProductDeletion();
  }

  async confirmProductDeletion() {
    const noResult = await this.noResultText;
    await noResult.waitForDisplayed();
  }
}

module.exports = new LoginPage();
