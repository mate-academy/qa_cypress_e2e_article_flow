/// <reference types="cypress" />

describe('Article flow', () => {
  let userData;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((newUser) => {
      userData = newUser;
    });

    cy.task('articleForm').then((articleForm) => {
      article = articleForm;
    });

    cy.visit('/editor');
  });

  it('should allow to create an article', () => {
    cy.login(userData);

    cy.createArticle(article);
  });

  it('should allow to delete an article', () => {
    cy.login(userData);

    cy.createArticle(article).then(({ slug }) => {
      cy.deleteArticle(slug);
    });
  });
});
