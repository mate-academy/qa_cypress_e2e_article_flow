/// <reference types="../support" />

describe('Article', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);
      cy.wrap(user).as('user');
    });
  });

  it('should allow to create an article', () => {
    cy.visit('editor');
    cy.fixture('article.json').then((article) => {
      cy.createArticle(article.title, article.description, article.body);
    });
    cy.get('@user').then((user) => {
      cy.contains('a', (user.username.toLowerCase()))
        .click();
    });
    cy.fixture('article.json').then((article) => {
      cy.contains('h1', article.title)
        .should('exist');
    });
  });

  it('should allow to delete an article', function () {
    cy.visit('editor');
    cy.fixture('article.json').then((article) => {
      cy.createArticle(article.title, article.description, article.body);
    });
    cy.get('@user').then((user) => {
      cy.contains('a', (user.username.toLowerCase()))
        .click();
    });

    cy.fixture('article.json').then((article) => {
      cy.contains('h1', article.title)
        .click();
    });

    cy.contains('button', 'Delete Article')
      .click();

    cy.contains('div', 'No articles are here... yet.')
      .should('exist');
  });
});
