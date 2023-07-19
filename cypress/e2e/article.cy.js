/// <reference types='cypress' />
/// <reference types='../support' />

const faker = require('faker');

describe('conduit article flow', () => {
  let article;

  beforeEach(() => {
    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
      cy.login().then(() => {
        cy.visit('/editor');
      });
    });
  });

  it('should allow to create article', () => {
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]').type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.get('[placeholder="Enter tags"]').type(article.tags);

    cy.contains('button', 'Publish Article').click();
    cy.url().should('include', '/article/');
  });

  it('should allow to delete the article', () => {
    cy.get('[href="/editor"]').click();
    cy.findByPlaceholder('Article Title').then($el => {
      cy.wrap($el).type(article.title);
    });
    cy.findByPlaceholder('What\'s this article about?').then($el => {
      cy.wrap($el).type(article.description);
    });
    cy.findByPlaceholder('Write your article (in markdown)').then($el => {
      cy.wrap($el).type(article.body);
    });
    cy.findByPlaceholder('Enter tags').then($el => {
      cy.wrap($el).type(article.tags);
    });

    cy.contains('button', 'Publish Article').click();

    cy.get('h1').should('contain', article.title);

    cy.contains('button', 'Delete Article').click();

    cy.contains('a', 'Your Feed').should('be.visible');

    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
