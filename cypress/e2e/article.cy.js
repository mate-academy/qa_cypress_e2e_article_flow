/// <reference types='cypress' />

describe('Article flow', () => {
  let article;

  beforeEach(() => {
    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });
    cy.loginConduit();
  });

  it('should allow to create article', () => {
    cy.get('.container > .nav > :nth-child(2) > .nav-link').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.get(':nth-child(2) > .form-control').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    cy.get('.btn').click();

    cy.contains('h1', article.title).should('be.visible');
    cy.url().should('include', 'article');
  });

  it('should allow to delete article', () => {
    cy.get('.container > .nav > :nth-child(2) > .nav-link').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.get(':nth-child(2) > .form-control').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    cy.get('.btn').click();

    cy.get(
      '.article-actions > .article-meta > :nth-child(3) > .btn-outline-danger'
    ).click();
  });
});
