import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/LoginPage';
import { Profile } from '../POM/ProfilePage';
import { BookStoreAPI } from '../POM/BookStoreAPI';

const userName: string = "tt28024";
const password: string = "Te5t1ng!";
const bookTitle = 'Learning JavaScript Design Patterns';
const credentials = {
    userName: 'tt28024',
    password: 'Te5t1ng!',
    userId: '5f17ffbb-fa33-4883-896c-841be19ad1d6'
};
const isbn = '9781449331818';

test.describe.serial('Book operations', () => {
    test.beforeEach('Add book via API', async ({ request }) => {
        const bookStore = new BookStoreAPI(request);

        // 1. Generate token
        const token = await bookStore.generateToken(credentials.userName, credentials.password);
        expect(token).toBeTruthy();

        // 2. Add book to user's collection
        const result = await bookStore.addBookToCollection(credentials.userId, isbn, token);

        // 3. Verify result
        if (result.skipped) {
            console.log('Book already exists, skipping add.');
            expect(result.skipped).toBeTruthy();
        } else {
            console.log('Book added successfully.');
            expect(result.response?.ok()).toBeTruthy();
        }
    });

    test('Delete book via UI', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const profile = new Profile(page);

        // Navigate to books page
        await loginPage.goto('https://demoqa.com/books');

        // And the user logs into application
        await loginPage.login(userName, password);
        // Then the login is successful and the username is displayed
        await profile.validateLoginSuccess(userName);

        // And the user is on Profile page
        await profile.gotoProfilePage();

        // When the user searches book "Learning JavaScript Design Patterns"
        // And the user clicks on the Delete icon
        await profile.deleteTheBook(bookTitle);

        // Then the alert is displayed with message "Book deleted."
        await profile.triggerAlertAndAccept("Book deleted.");

        // Wait for search results to update
        await page.waitForTimeout(2000);
        // And the book is not shown
        await profile.verifyBookDisplayed(bookTitle, true);
    });
});