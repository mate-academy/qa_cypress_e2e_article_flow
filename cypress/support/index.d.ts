declare namespace Cypress {
  interface Chainable<Subject> {
    register(email: string, username: string, password: string): Chainable<any>
    login(email: string, password: string): Chainable<any>
    createArticle(title: string, description: string, body: string): Chainable<any>
    tagsCheck(tags: string): Chainable<any>
  };
};
