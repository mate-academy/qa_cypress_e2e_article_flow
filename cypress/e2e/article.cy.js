/// <reference types="cypress" />
/// <reference types="../support" />
describe('article flow', () => {
  let article;

  beforeEach(() => {
    cy.loginConduit();

    cy.task('newArticle')
      .then((newArticle) => {
        article = newArticle;
        cy.createArticle(newArticle);
      }
      );
    cy.visit('/editor');
  });
  it('should allow to create an article', () => {
    cy.findByPlaceholder('Article Title')
      .type(article.title);

    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);

    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);

    cy.findByPlaceholder('Enter tags')
      .type(article.tag);

    setTimeout(() => {
      cy.contains('button', 'Publish Article')
        .click();
    }, '1000');

    cy.url()
      .should('contain', '/article');

    cy.findByPlaceholder('Write a comment...')
      .should('be.visible');
  });

  it('should allow to delete the article', () => {
    cy.findByPlaceholder('Article Title')
      .type(article.title);

    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);

    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);

    cy.findByPlaceholder('Enter tags')
      .type(article.tag);

    setTimeout(() => {
      cy.contains('button', 'Publish Article')
        .click();
    }, '1000');

    cy.get('h1')
      .should('contain', article.title);

    cy.contains('button', 'Delete Article')
      .click();

    cy.url()
      .should('contain', '/');

    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
