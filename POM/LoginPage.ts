import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput : Locator;
  readonly passwordInput : Locator;
  readonly loginButton : Locator;
 
  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator("#userName");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login"); 
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async login (username: string, password: string) {
    await this.loginButton.click();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
    
  }

  
  
  