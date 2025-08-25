/// <reference types="cypress" />

describe('Articles flow', () => {
  beforeEach(() => {
    cy.task('generateUser').then((user) => {
      cy.wrap(user).as('user');
      cy.login(user.email, user.username, user.password);
    });
  });

  it('should create an article', () => {
    cy.task('createArticle').then(({ title, description, body }) => {
      cy.createArticle(title, description, body);

      cy.contains('h1', title).should('be.visible');
      cy.contains('p', body).should('be.visible');
      cy.url().should('include', '/article/');

      cy.wrap(title).as('title');
    });
  });

  it('should delete an article', function () {
    cy.task('createArticle').then(({ title, description, body }) => {
      cy.createArticle(title, description, body);
      cy.wrap(title).as('title');
    });

    cy.get('@user').then((user) => {
      cy.visit(`/profile/${user.username}`);
    });

    cy.contains('a', 'My Posts').should('have.class', 'active');

    cy.get('@title').then((title) => {
      cy.contains('.article-preview', title).click();
      cy.contains('h1', title).should('be.visible');
    });

    cy.get('.banner').find('.btn-outline-danger').click();

    cy.get('@user').then((user) => {
      cy.visit(`/profile/${user.username}`);
    });

    cy.get('.article-preview').should(
      'contain.text',
      'No articles are here... yet.'
    );
  });
});
