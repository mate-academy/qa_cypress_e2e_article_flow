describe('Article flow', () => {
  let uniqueId;
  let email;
  let username;
  let password;

  let title;
  let description;
  let body;

  before(() => {
    uniqueId = Date.now();
    email = `testuser${uniqueId}@mail.com`;
    username = `testuser${uniqueId}`;
    password = 'Test1234';

    title = `Title ${uniqueId}`;
    description = 'Test description';
    body = 'Test article body';

    cy.login(email, username, password);
  });

  describe('Create article', () => {
    it('should create the article via UI', () => {
      cy.visit('/');
      cy.contains('a.nav-link', 'New Article').click();
      cy.get('[placeholder="Article Title"]').type(title);
      cy.get(`[placeholder="What's this article about?"]`).type(description);
      cy.get('[placeholder="Write your article (in markdown)"]').type(body);
      cy.contains('[type="button"]', 'Publish Article').click();
      cy.contains('h1', title).should('exist');
    });
  });

  describe('Delete article', () => {
    before(() => {
      cy.visit('https://conduit.mate.academy/user/login');
      cy.get('[placeholder="Email"]').type(email);
      cy.get('[placeholder="Password"]').type(password);
      cy.contains('button', 'Sign in').click();
      cy.contains('a.nav-link', 'New Article');
      cy.createArticle(title, description, body);
    });

    it('should delete the article', () => {
      cy.visit('https://conduit.mate.academy/user/login');
      cy.contains('a.nav-link', username).click();
      cy.contains('h1', title).click();
      cy.contains('button', 'Delete Article').click();
      cy.url().should('eq', `${Cypress.config().baseUrl}`);
    });
  });
});
