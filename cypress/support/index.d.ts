declare namespace Cypress {
  interface Chainable<Subject> {
    login(email: string, username: string, password: string): Chainable<any>
    createArticle(email: string, username: string, password: string, title: string, description: string, body: string): Chainable<any>
  };
};
