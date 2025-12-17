import { APIRequestContext, expect } from '@playwright/test';

export class BookStoreAPI {
    readonly request: APIRequestContext;
    readonly baseUrl: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.baseUrl = 'https://demoqa.com';
    }

    async generateToken(userName: string, password: string): Promise<string> {
        const response = await this.request.post(`${this.baseUrl}/Account/v1/GenerateToken`, {
            data: { userName, password },
        });
        expect(response.ok()).toBeTruthy();
        const json = await response.json();
        return json.token || json.Token || json.accessToken;
    }

    async getUserBooks(userId: string, token: string) {
        const response = await this.request.get(`${this.baseUrl}/Account/v1/User/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok()) throw new Error(`Failed to fetch user: ${response.status()}`);
        const json = await response.json();
        return json.books || json.booksResult || [];
    }

    async addBookToCollection(userId: string, isbn: string, token: string) {
        // Verify if the book is already in the user's collection
        const userBooks = await this.getUserBooks(userId, token);
        const alreadyHas = userBooks.some((b: any) => (b.isbn || b.ISBN) === isbn);

        if (alreadyHas) {
            return { skipped: true };
        }

        // If not present, add the book
        const response = await this.request.post(`${this.baseUrl}/BookStore/v1/Books`, {
            headers: { Authorization: `Bearer ${token}` },
            data: {
                userId: userId,
                collectionOfIsbns: [{ isbn: isbn }]
            },
        });

        return { skipped: false, response };
    }
}