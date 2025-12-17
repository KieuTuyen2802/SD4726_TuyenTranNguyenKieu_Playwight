import { expect, type Locator, type Page } from '@playwright/test';

export class Profile {
  readonly page: Page;
  readonly usernameValue: Locator;
  readonly profileButton: Locator;
  readonly searchBox: Locator;
  readonly deleteIcon: Locator;
  readonly alertButton: Locator;
  readonly allrowLocator: Locator;


  constructor(page: Page) {
    this.page = page;
    this.usernameValue = page.locator("#userName-value");
    this.profileButton = page.locator('xpath=//span[text()="Profile"]');
    this.searchBox = page.locator("#searchBox");
    this.deleteIcon = page.locator('xpath=//span[@title="Delete"]');
    this.alertButton = page.locator('xpath=//button[text()="OK"]');
    this.allrowLocator = page.locator('[id*="see-book"]');

  }
  async validateLoginSuccess(usernameLogin: string) {
    // Assert that the username is visible
    await expect(this.usernameValue).toHaveText(usernameLogin);
  }

  async gotoProfilePage() {
    await this.profileButton.click();
    await expect(this.page).toHaveURL(`https://demoqa.com/profile`);
  }

  async deleteTheBook(bookTitle: string) {
    //When the user searches book "Learning JavaScript Design Patterns"
    await this.searchBox.fill(bookTitle);
    //And the user clicks on the Delete icon
    await this.deleteIcon.click();

  }

  async triggerAlertAndAccept(expectedMessage: string): Promise<void> {
    // Register the dialog handler BEFORE the action that causes the dialog
    this.page.on('dialog', async dialog => {
      // Assert the dialog message (optional, but good practice for verification)
      expect(dialog.message()).toBe(expectedMessage);
      // Accept the alert (click 'OK')
      await dialog.accept();
    });
    // Click the button that triggers the alert
    await this.alertButton.click();
    // Ensure the handler is called and the action completes
    // Playwright automatically waits for the dialog to be handled
  }

  async verifyBookDisplayed(bookTitle: string, isDisplayed: boolean) {
    const bookLocator = this.page.locator(`//div[@class='rt-tr-group']//a[text()='${bookTitle}']`);
    if (isDisplayed) {
      // Check if the specific book title exists
      console.log(`⚠️ The book "${bookTitle}" is available.`);
      await expect(bookLocator).toBeVisible();
    }
    else {
      console.log(`✅ The "${bookTitle}" is not listed.`);
      await expect(bookLocator).not.toBeVisible();
    }
  }
}