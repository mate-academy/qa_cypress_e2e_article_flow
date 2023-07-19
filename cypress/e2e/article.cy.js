const faker = require('faker');
let article; 
let user;

describe('Article flow suit', () => {
  beforeEach(() => {
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
    user = {
      username: 'joebin1'
    };
    cy.login();
  });

  it('should create an article', () => {
    cy.createArticle(article.title, article.description, article.body);
    
    cy.contains('h1', article.title).should('be.visible');
    cy.contains('a', 'Edit Article').should('be.visible');
    cy.contains('p', article.body).should('be.visible');
    cy.get(`[href="/profile/${user.username}"]`).should('contain', user.username);
  });

  it('should delete article', () => {

    cy.createArticle(article.title, article.description, article.body);

    cy.contains('h1', article.title).should('be.visible');
    cy.contains('a', 'Edit Article').should('be.visible');
    cy.contains('p', article.body).should('be.visible');
    cy.get(`[href="/profile/${user.username}"]`).should('contain', user.username);

    cy.contains('button',' Delete Article',).click();
    cy.on('window:confirm', () => true);

    cy.visit(`/profile/${user.username}`);

    cy.get('.preview-link').should('not.have.text', article.title);
    cy.get('.preview-link').should('not.have.text', article.description);
  });
});