import { faker } from '@faker-js/faker';

describe('Articles flow', () => {
  let user;
  let article;

  beforeEach(() => {
    user = {
      email: faker.internet.email(),
      username: (
        faker.helpers.replaceSymbols('?', {
          symbols: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        }) +
      faker.internet.userName()
        .replace(/[^A-Za-z0-9_-]/g, '')
        .replace(/^[^A-Za-z]+/, '')
      ).toLowerCase(),
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
    cy.visit('/');
    cy.login(user.email, user.username, user.password);
  });
  it('should create an article', () => {
    cy.visit('/editor');
    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get('input[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    article.tags.forEach((tag) => {
      cy.get('input[placeholder="Enter tags"]').type(tag + '{enter}');
    });
    cy.contains('button', 'Publish Article').click();
    cy.contains('h1', article.title).should('be.visible');
  });

  it('should delete article', () => {
    cy.createArticle(article.title, article.description, article.body);
    cy.visit(`/profile/${user.username}`);
    cy.contains('h1', article.title).click();
    cy.on('window:confirm', () => true);
    cy.contains('button', 'Delete Article').click();
    cy.location('pathname').should('eq', '/');
    cy.visit(`/profile/${user.username}`);
    cy.contains(article.title).should('not.exist');
  });
});
