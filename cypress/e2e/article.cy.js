/// <reference types="cypress" />

describe('Article flow', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
 cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  it('Create article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]')
      .type(article.title);
    cy.get('[placeholder^="What\'s this"]')
      .type(article.description);
    cy.get('[placeholder^="Write your"]')
      .type(article.body);
    cy.contains('button', 'Publish Article')
      .click({ force: true });
  });

  it('Delete article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`article/${response.body.article.slug}`);
      });
    cy.contains('Delete Article').click();

    cy.get('.article-preview').should('contain', 'No articles are here... yet.');
  });
});
