/// <reference types='cypress' />

const { faker } = require('@faker-js/faker');

describe('Article flow', () => {
  let user;
  let article;

  beforeEach(() => {
    user = {
      email: faker.internet.email(),
      username: faker.person.firstName().toLowerCase(),
      password: faker.internet.password()
    };

    article = {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(5),
      body: faker.lorem.paragraphs(2),
      tags: [
        faker.lorem.word(),
        faker.lorem.word(),
        faker.lorem.word()
      ]
    };

    cy.login(user.email, user.username, user.password);

    cy.visit('/editor');
  });

  it('Create the article', () => {
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    article.tags.forEach((tag) => {
      cy.get('input[placeholder="Enter tags"]').type(tag + '{enter}');
    });
    cy.contains('.btn', 'Publish Article').click();
    cy.contains('h1', article.title).should('be.visible');
    cy.get('.author').should('contain', user.username);
  });

  it('Delete the article', () => {
    cy.createArticle(article.title, article.description, article.body);
    cy.contains('.nav-link', user.username).click();
    cy.contains('h1', article.title).click();
    cy.contains('.btn', 'Delete Article').click();
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
