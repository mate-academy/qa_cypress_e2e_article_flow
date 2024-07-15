/// <reference types="cypress" />

describe('Article flow', () => {
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((newUser) => {
      const userData = newUser;

      cy.login(userData);
    });

    cy.task('articleForm').then((articleForm) => {
      article = articleForm;
    });

    cy.visit('/editor');
  });

  it('should allow to create an article', () => {
    cy.createArticle(article).then(({ slug }) => {
      cy.visit(`article/${slug}`);

      cy.url().should('include', `article/${slug}`);

      cy.get('.banner').should('contain', article.title);
    });
  });

  it('should allow to delete an article', () => {
    cy.createArticle(article).then(({ slug }) => {
      cy.deleteArticle(slug).then((statusCode) => {
        expect(statusCode).to.equal(204);
      });

      cy.request({
        method: 'GET',
        url: `/api/articles/${slug}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });
  });
});
