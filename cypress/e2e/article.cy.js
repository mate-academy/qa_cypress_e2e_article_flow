/* eslint-disable cypress/no-force */

describe('Article flow', () => {
  let article;

  beforeEach(() => {
    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });

    cy.loginConduit();
  });

  it('should allow to create an article', () => {
    cy.get('[href="/editor"]')
      .click();

    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.findByPlaceholder('Enter tags')
      .type(article.tag);
    cy.contains('button', 'Publish Article')
      .click({ force: true });

    cy.contains('h1', article.title)
      .should('be.visible');
    cy.url()
      .should('include', 'article');
  });

  it('should allow to delete an article', () => {
    cy.get('[href="/editor"]')
      .click();

    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.findByPlaceholder('Enter tags')
      .type(article.tag);
    cy.contains('button', 'Publish Article')
      .click({ force: true });
    cy.contains('button', 'Delete Article')
      .click();

    cy.contains('a', 'Your Feed')
      .should('be.visible');
    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
