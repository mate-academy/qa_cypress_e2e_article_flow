/// <reference types="cypress" />

describe('Article page', () => {
  before(() => {
    cy.task('generateUser').as('user');
    cy.task('generateArticle').as('article');
  });

  it('should create article', function() {
    const { email, username, password } = this.user;
    cy.login(email, username, password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title').type(this.article.title);
    cy.findByPlaceholder(`What's this article about?`).type(this.article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(this.article.body);
    cy.contains('.btn', 'Publish').click();
    cy.get('.banner').should('contain', this.article.title);
  });

  it.only('should delete article', function() {
    const { email, username, password } = this.user;
    const { title, description, body } = this.article;
    cy.login(email, username, password);
    cy.createArticle(title, description, body).then((res) => {
      cy.visit(`/article/${res.body.article.slug}`);
    });

    cy.contains('.btn', 'Delete Article').click();
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
