import { test, expect } from '@playwright/test';
import { BookStoreAPI } from '../POM/BookStoreAPI';

test.describe('Bookstore API Tests', () => {
    let bookStore: BookStoreAPI;
    
    
    const credentials = {
        userName: 'tt28024',
        password: 'Te5t1ng!',
        userId: '5f17ffbb-fa33-4883-896c-841be19ad1d6'
    };
    const isbn = '9781449331818';

    test.beforeEach(async ({ request }) => {
        bookStore = new BookStoreAPI(request);
    });

    test('should add a book to user collection if not already present', async () => {
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
});