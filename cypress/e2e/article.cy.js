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
      const title = `${article.title} ${Date.now()}`;
      const description = `${article.description} ${Date.now()}`;
      const body = `${article.body} ${Date.now()}`;
      cy.createArticle(title, description, body);
    });
    cy.get('@user').then((user) => {
      cy.contains('a', (user.username.toLowerCase()))
        .click();
    });
    cy.fixture('article.json').then((article) => {
      cy.contains('h1', article.title)
        .should('exist');
    });
    cy.fixture('article.json').then((article) => {
      cy.contains('p', article.description)
        .should('exist');
    });
    cy.fixture('article.json').then((article) => {
      cy.contains('h1', article.title)
        .click();
    });
    cy.fixture('article.json').then((article) => {
      cy.contains('p', article.body).should('exist');
    });
  });

  it('should allow to delete an article', function () {
    cy.visit('editor');
    cy.fixture('article.json').then((article) => {
      const title = `${article.title} ${Date.now()}`;
      const description = `${article.description} ${Date.now()}`;
      const body = `${article.body} ${Date.now()}`;
      cy.createArticle(title, description, body);
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
