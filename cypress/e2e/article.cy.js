/// <reference types='cypress' />

describe('Article flow', () => {
  let article;

  beforeEach(() => {
    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });
    cy.login();
    cy.visit('/');
  });

  it('should allow to create the article', () => {
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
    // eslint-disable-next-line cypress/no-force
    cy.contains('button', 'Publish Article')
      .click({ force: true });

    cy.url().should('include', 'article');
    cy.get('h1').should('contain.text', article.title);
  });

  it('should allow to delete the article', () => {
    cy.createArticle(article.title,
      article.description,
      article.body,
      article.tag).then((response) => {
      const slug = response.body.article.slug;
      cy.visit(`/article/${slug}`);
    });
    cy.contains('button', 'Delete Article')
      .click();

    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
    cy.url().should('include', '/');
  });
});
