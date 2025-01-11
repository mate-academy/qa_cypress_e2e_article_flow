/// <reference types="cypress" />

describe('Article Management', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.visit('/');
    cy.location('protocol').should('eq', 'https:');
    cy.title().should('eq', 'Conduit');

    cy.task('generateUser').then((generateUser) => {
      cy.expectData(generateUser, 'email');
      cy.expectData(generateUser, 'username');
      cy.expectData(generateUser, 'password');
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });

    cy.task('generateArticle').then((generateArticle) => {
      cy.createArticle(
        generateArticle.title,
        generateArticle.description,
        generateArticle.body
      );
      article = generateArticle;
    });
  });

  it('should display the newly created article on the profile', () => {
    cy.visit(`/profile/${user.username.toLowerCase()}`);
    cy.get('.article-preview')
      .should('contain.text', article.title)
      .and('contain.text', article.description);
  });

  it('should add a new article', () => {
    cy.visit(`/profile/${user.username.toLowerCase()}`);
    cy.get('h1').should('contain.text', article.title).click();
    cy.get('[class="btn btn-outline-danger btn-sm"]').first().click();
    cy.on('window:confirm', (message) => {
      expect(message).to.equal('Do you really want to delete it?');
      return true;
    });
    cy.visit(`/profile/${user.username.toLowerCase()}`);
    cy.get('.article-preview').should(
      'contain.text',
      'No articles are here... yet.'
    );
  });
});
