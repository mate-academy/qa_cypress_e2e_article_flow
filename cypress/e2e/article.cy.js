/// <reference types="cypress" />

describe('should register and login user', () => {
  beforeEach(() => {
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);

      cy.visit(`/profile/${user.username}`);
      cy.wrap(user).as('user');
    });
  });

  it('should not have articles yet', () => {
    cy.get('.article-preview').should(
      'contain.text',
      'No articles are here... yet.'
    );
  });

  it('should create and delete an article', () => {
    cy.task('createArticle').then(({
      title,
      description,
      body
    }) => {
      cy.createArticle(title, description, body);

      cy.get('@user').then((user) => {
        cy.visit(`/profile/${user.username}`);
      });

      cy.contains('a', 'My Posts').should('have.class', 'active');

      cy.contains('.article-preview', `Article title: ${title}`).click();

      cy.contains('h1', `${title}`);

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
});
