/// <reference types="cypress"/>

describe('article\'s flow testing', () => {
  let article;
  let user;

  beforeEach(() => {
    return cy.task('generateUser').then((u) => {
      user = u;
      return cy.login(user.email, user.username, user.password);
    }).then(() => {
      return cy.task('generateArticle');
    }).then((a) => {
      article = a;
      return cy.createArticle(article.title, article.description, article.body);
    }).then(() => {
      cy.intercept('GET', '**/api/articles*').as('getArticles');

      cy.visit('/');
      cy.contains('.nav-link', 'Global Feed').click();
    });
  });

  it('should create article', () => {
    cy.wait('@getArticles');
    cy.contains('.author', user.username.toLowerCase());
    cy.contains('h1', `Article title: ${article.title}`).should('be.visible');
  });

  it('should delete article', () => {
    cy.wait('@getArticles');
    cy.contains('h1', `Article title: ${article.title}`).click();
    cy.contains('button', ' Delete Article').click();
  });
});
