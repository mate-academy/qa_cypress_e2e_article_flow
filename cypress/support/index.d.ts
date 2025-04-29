 declare namespace Cypress {
  interface Chainable<Subject> {
    login(username: string, email: string, password: string): Chainable<any>
    createArticle(title: string, description: string, body: string): Chainable<any>
  };
}; 
