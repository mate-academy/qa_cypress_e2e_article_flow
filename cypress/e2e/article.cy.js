const { faker } = require('@faker-js/faker');

/// <reference types='cypress' />

const { articleData } = require('../support/articleData.cy');

describe('Article-flow', () => {
  let user;
  const article = articleData();

  beforeEach(() => {
    const generatedUser = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: '12345Qwert!'
    };
    user = generatedUser;

    cy.login(user.email, user.username, user.password);
    cy.visit('');
  });

  it('Should create an article with all filled fields', () => {
    cy.contains('.nav-link', 'New Article').click();

    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.get('[placeholder="Enter tags"]').type(`${article.tags}{enter}`);

    cy.contains('.btn', 'Publish Article').click();

    cy.url().should('contain', 'article/');
  });

  it('Should be able to delete article', () => {
    cy.contains('.nav-link', 'New Article').click();

    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.get('[placeholder="Enter tags"]').type(`${article.tags}{enter}`);

    cy.contains('.btn', 'Publish Article').click();

    cy.url().should('contain', 'article/');

    cy.contains('.btn', 'Delete Article').click();

    cy.url().should('not.contain', 'article');
  });
});
