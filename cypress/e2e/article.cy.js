import { generate } from '../support/generate';
/// <reference types='cypress' />

const gen = generate();

describe('Article creation and deletion', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should able to create the article', () => {
    cy.register(gen.user.email, gen.user.username, gen.user.password);
    cy.login(gen.user.email, gen.user.password);

    cy.reload();

    cy.get('.container > .nav > :nth-child(2) > .nav-link').click();
    cy.get('[placeholder="Article Title"]')
      .type(gen.article.articleTitle);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(gen.article.articleTheme);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(gen.article.articleBody);
    cy.get('[placeholder="Enter tags"]')
      .type(gen.article.articleTags);
    cy.get('[type="button"]').click();

    cy.get('h1')
      .should('contain', gen.article.articleTitle);
    cy.get('div > p')
      .should('contain', gen.article.articleBody);
    cy.tagsCheck(gen.article.articleTags);
    cy.contains('Delete Article').click();
  });

  it('should able to delete the article', () => {
    cy.login(gen.user.email, gen.user.password);
    cy.createArticle(
      gen.article.articleTitle,
      gen.article.articleTheme,
      gen.article.articleBody
    );

    cy.reload();

    cy.get(`[href="/profile/${gen.user.username}"]`).click();
    cy.contains(`${gen.article.articleTitle}`).click();
    cy.contains('Delete Article').click();

    cy.get(`footer`).click();
    cy.get(`[href="/profile/${gen.user.username}"]`).click();

    cy.reload();

    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
