/// <reference types='cypress' />

const { generateUserData } = require('../support/e2e');

describe('', () => {
  before(() => {
    cy.visit('/');
  });

  it('create the article', () => {
    const { email, username, password } = generateUserData();

    cy.login(email, username, password);

    const article = {
      title: `title${Date.now()}`,
      description: `Description${Date.now()}`,
      body: `Any text ${Date.now()}`
    };

    cy.createArticle(article.title, article.description, article.body);

    cy.visit('/');

    cy.contains('h1', article.title).should('include.text');
  });

  it('delete the article', function () {
    const { email, username, password } = generateUserData();
    cy.login(email, username, password);

    const article = {
      title: `title${Date.now()}`,
      description: `Description${Date.now()}`,
      body: `Any text ${Date.now()}`
    };
    cy.createArticle(article.title, article.description, article.body).then(
      (slug) => {
        cy.deleteArticle(slug);
      }
    );

    cy.visit('/');

    cy.contains('h1', article.title).should('not.include.text');
  });
});
