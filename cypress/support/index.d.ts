declare namespace Cypress {
  interface Chainable {
    login(
      email: string,
      username: string,
      password: string,
    ): Chainable<void>;

    createArticle(
      title: string,
      description: string,
      body: string,
    ): Chainable<void>;
  }
}
