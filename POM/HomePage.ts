import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly bookTitle: Locator;
 

  constructor(page: Page) {
    this.page = page;

    this.searchBox = page.locator('#searchBox');
    this.bookTitle = page.locator(`xpath=//span[contains(@id,'see-book')]/a`);
   
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async expectNumberOfBook (expectedCount: number) {
    await expect(this.bookTitle).toHaveCount(expectedCount);
  }

  
    async fillSearchBox(text: string) {
    await this.searchBox.fill(text);
  }

  async expectBookTitle(booktitle: string[] ) {
    await expect(this.bookTitle).toContainText(booktitle);
  }
}