/// <reference types="cypress" />

describe('should register and login user', () => {
  beforeEach(() => {
    cy.task('generateUser').then((user) => {
      cy.wrap(user).as('user');

      cy.login(user.email, user.username, user.password);

      cy.task('createArticle').then(({ title, description, body }) => {
        cy.createArticle(title, description, body);

        cy.wrap(title).as('title');
      });

      cy.visit(`/profile/${user.username}`);
    });
  });

  it('should delete an article', () => {
    cy.contains('a', 'My Posts').should('have.class', 'active');

    cy.get('@title').then((title) => {
      cy.contains('.article-preview', `Article title: ${title}`).click();

      cy.contains('h1', `${title}`);
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
