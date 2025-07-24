// cypress/support/index.d.ts

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to login a user via API.
       * Registers a new user and logs them in, storing JWT in localStorage.
       * @example cy.login().then((data) => { console.log(data.user.username, data.token); });
       */
      login(): Chainable<{ user: { username: string, email: string, password: string }, token: string }>;

      /**
       * Custom command to create an article via API.
       * Requires user to be logged in (JWT in localStorage).
       * @param articleData - Object containing title, description, body, and optional tagList.
       * @example cy.createArticle({ title: 'My Article', description: 'About something', body: 'Content' });
       */
      createArticle(articleData: {
        title: string;
        description: string;
        body: string;
        tagList?: string[];
      }): Chainable<any>; // Повертає об'єкт статті
    }
  }
}
