/// <reference types="cypress" />

describe('Article flow', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    cy.visit('https://conduit.mate.academy/');
  });

  it('should create article', () => {
    const uniqueId = Date.now();
    const articleTitle = `Cypress Test ${uniqueId}`;
    const articleDescription = `Description ${uniqueId}`;
    const articleBody = `Body content ${uniqueId}`;

    cy.contains(user.username).should('be.visible');

    cy.createArticle(articleTitle, articleDescription, articleBody);

    cy.get('a.nav-link').contains('Global Feed').click();
    cy.contains(articleTitle).should('be.visible');
  });

  it('should delete article', () => {
    const uniqueId = Date.now();
    const articleTitle = `Cypress Delete Test ${uniqueId}`;
    const articleDescription = `Delete description ${uniqueId}`;
    const articleBody = `Delete body ${uniqueId}`;

    cy.contains(user.username).should('be.visible');

    cy.createArticle(articleTitle, articleDescription, articleBody);

    cy.get('a.nav-link').contains('Global Feed').click();
    cy.contains(articleTitle).should('be.visible').click();

    cy.get('.article-meta .btn-outline-danger').click();

    cy.get('a.nav-link').contains('Global Feed').click();
    cy.contains(articleTitle).should('not.exist');
  });
});
