import { faker } from '@faker-js/faker';
/// <reference types='cypress' />

describe('Article Blog site', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      article = {
        title: faker.lorem.sentence(4),
        description: faker.lorem.sentence(6),
        body: faker.lorem.paragraph()
      };

      cy.visit('/');
    });
  });

  it('should create an article', () => {
    cy.login(user.email, user.username, user.password);

    cy.visit('/');

    cy.contains('a.nav-link', 'New Article').click();

    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get('input[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type(article.body);

    cy.contains('button', 'Publish Article').click();

    cy.url().should('include', '/article/');
    cy.contains('h1', article.title).should('be.visible');
  });

  it('should delete an article', () => {
    cy.login(user.email, user.username, user.password);

    cy.visit('/');

    cy.createArticle(article.title, article.description, article.body);

    cy.contains('a.nav-link', user.username.toLowerCase()).click();

    cy.contains('.article-preview', article.title).click();

    cy.contains('button', 'Delete Article').should('be.visible').click();

    cy.url().should('eq', 'https://conduit.mate.academy/');
    cy.contains('No articles are here... yet.').should('be.visible');
  });
});
