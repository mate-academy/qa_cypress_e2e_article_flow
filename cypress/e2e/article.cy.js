/// <reference types='cypress' />

describe('Article flow', () => {
  let user;
  beforeEach('Log In', () => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(
        user.email,
        user.username,
        user.password
      );
    });
  });

  it('Create the article', () => {
    cy.intercept('POST', '/api/articles').as('getSlug');
    cy.task('generateArticle').as('article');
    cy.get('@article').then((article) => {
      cy.visit('editor');
      cy.get('input[placeholder="Article Title"]').type(article.title);
      cy.get('input[placeholder="What\'s this article about?"]')
        .type(article.description);
      cy.get('textarea[placeholder="Write your article (in markdown)"]')
        .type(article.body);
      cy.get('input[placeholder="Enter tags"]').type(article.tagList);
      cy.get('button').contains('Publish').should('be.enabled')
        .trigger('click');
    });
    cy.wait('@getSlug').then((interception) => {
      const responseBody = interception.response.body;
      const slug = responseBody.article.slug;
      cy.url().should('include', slug);
    });
    cy.get('@article').then((article) => {
      cy.get('h1').should('contain.text', article.title);
      cy.get('a[class=author]').eq(0)
        .should('contain.text', user.username.toLowerCase());
      cy.get('div[class="row article-content"]')
        .should('contain.text', article.body);
    });
  });

  it('Delete the article', () => {
    cy.task('generateArticle').as('article');

    cy.get('@article').then((article) => {
      cy.createArticle(article.title, article.description, article.body)
        .then((slug) => {
          cy.wrap(slug).as('slug');
        });
    });

    cy.get('@slug').then((slug) => {
      cy.intercept('DELETE', `/api/articles/${slug}`).as('articleDeleted');
      cy.visit(`article/${slug}`);
    });

    cy.get('@article').then((article) => {
      cy.get('h1').should('contain.text', article.title);
      cy.contains('button', 'Delete Article').click();
    });

    cy.wait('@articleDeleted').then((interception) => {
      expect(interception.response.statusCode).to.eq(204);
      cy.contains('a', 'Your Feed').should('be.visible');
      cy.get('.article-preview')
        .should('contain.text', 'No articles are here... yet.');
    });
  });
});
