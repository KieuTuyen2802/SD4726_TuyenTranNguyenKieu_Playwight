import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/LoginPage';
import { Profile } from '../POM/ProfilePage';

const userName: string = "tt28024";
const password: string = "Te5t1ng!";

test('The boos is deleted successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const profile = new Profile(page);
    await loginPage.goto('https://demoqa.com/books');

    // And the user logs into application
    await loginPage.login(userName, password);
    // Then the login is successful and the username is displayed
    await profile.validateLoginSuccess(userName);

    // And the user is on Profile page
    await profile.gotoProfilePage();

    //When the user searches book "Learning JavaScript Design Patterns"
    //And the user clicks on the Delete icon
    await profile.deleteTheBook('Learning JavaScript Design Patterns');

    // Then the alert is displayed with message "Book deleted."
    await profile.triggerAlertAndAccept("Book deleted.");

    //Wait for search results to update
    await page.waitForTimeout(2000);
    //And the book is not show
    const bookTitle = 'Learning JavaScript Design Patterns';
    await profile.expectBookNotPresent(bookTitle);
});  
