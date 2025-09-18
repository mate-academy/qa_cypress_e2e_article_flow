/* eslint max-len: ["off"] */
/// <reference types="cypress" />

describe('Article Flow', () => {
  const uniqueId = Date.now();
  const user = {
    email: `test${uniqueId}@mail.com`,
    username: `user${uniqueId}`,
    password: 'Password123!'
  };

  const article = {
    title: `Test Article ${uniqueId}`,
    description: 'Cypress article test description',
    body: 'This is the body of the Cypress test article'
  };

  before(() => {
    // Log in user via custom command (creates user if needed)
    cy.login(user.email, user.username, user.password);
  });

  it('creates a new article', () => {
    cy.visit('/editor');

    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get('input[placeholder*="this article about"]').type(article.description);
    cy.get('textarea[placeholder*="Write your article"]').type(article.body);

    cy.contains('button', 'Publish Article').click();

    cy.url().should('include', '/article/');
    cy.contains('h1', article.title).should('be.visible');
    cy.contains('p', article.body).should('be.visible');
  });

  describe('Article deletion', () => {
    beforeEach(() => {
      // Prepare article for deletion
      cy.createArticle(article.title, article.description, article.body);
    });

    it('deletes the article', () => {
      cy.visit(`/@${user.username}`);
      cy.contains('a', article.title).click();

      cy.contains('button', 'Delete Article').click();

      // Deterministic verification: revisit profile and assert absence
      cy.visit(`/@${user.username}`);
      cy.contains('a', article.title).should('not.exist');
    });
  });
});
