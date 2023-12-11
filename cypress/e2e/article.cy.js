/// <reference types="Cypress" />

const { LoremModule } = require("@faker-js/faker");

describe('Conduit Article Flow', () => {
  let user;

  before(() => {
    cy.task('generateUser').then(generatedUser => {
      user = generatedUser;
    });
  });

  it('user should be able to create an article', () => {
    //Loging in 
    cy.visit('user/login');
    cy.login(user.email, user.username, user.password);
    //Creating an article
    cy.visit('editor');
    cy.get('[placeholder="Article Title"]').type(user.articleTitle);
    cy.get(`[placeholder="What's this article about?"]`).type(user.articleBio);
    cy.get(`[placeholder="Write your article (in markdown)"]`).type(user.articleContent);
    cy.get(`[placeholder="Enter tags"]`).type(user.articleTags);
    cy.get('button').contains('Article').click();
    //Assertion
    cy.url().should('contains', '/article');
    cy.get('a').contains(' Edit Article').should('be.visible');
    cy.get('button').contains('Delete Article').should('be.visible');
    cy.get('[placeholder="Write a comment..."').should('be.visible');
  });

  it('Deleting created article', () => {
        //Loging in 
    cy.visit('user/login');
    cy.login(user.email, user.username, user.password);
    //Creating an article
    cy.createArticle(user.articleTitle, user.articleBio, user.articleContent);
    //Deleting an article
    cy.visit(`profile/${user.username.toLowerCase()}`);
    cy.get('a').contains(user.articleTitle).click();
    cy.get('button').contains('Delete Article').click();
    cy.on('window:alert', (str) => {
      expect(str).to.contain('OK').click();
  });
    //Assertion
    cy.visit(`profile/${user.username.toLowerCase()}`);
    cy.get('.article-preview').should('not.contain.text', user.articleTitle);
    cy.get('.article-preview').should('contain.text', 'No articles are here... yet.');

  });
});
