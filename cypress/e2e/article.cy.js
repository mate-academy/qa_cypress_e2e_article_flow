/// <reference types='cypress' />
import { generateUser, generateeArticle } from '../support/generate';

describe('Article flow', () => {
  const user = generateUser();
  const article = generateeArticle();

  beforeEach(() => {
    cy.visit('/');
  });

  it('should create the article', () => {
    cy.login(user.email, user.username, user.password);

    cy.contains('.nav-link', 'New Article').should('be.visible').click();

    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.get('[placeholder="Enter tags"]').type(article.tag);

    cy.contains('.btn', 'Publish Article').click();

    cy.url().should('include', '/article/');
  });

  it('should delete the article', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;

        cy.visit(`/article/${slug}`);
      });

    cy.contains('.btn', 'Delete Article').click();
    cy.contains('.nav-link', 'Global Feed').should('be.visible');
  });
});
