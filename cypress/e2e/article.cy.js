/* eslint-disable comma-dangle */
const { faker } = require('@faker-js/faker');

describe('Tests for Article flow', () => {
  let user, article;

  const generateData = () => {
    const randomNum = String(Math.random()).slice(2, 5);
    const username = `${faker.internet
      .userName()
      .replace(/\./g, '_')}_${randomNum}`;
    const email = `${username}@post.com`;
    const password = `${username}_qwerty`;

    const title = faker.word.words(4);
    const description = faker.word.words(10);
    const body = faker.word.words(20);
    const tags = faker.word.words(3).split(' ');

    return {
      user: { username, email, password },
      article: { title, description, body, tags },
    };
  };

  before(() => {
    cy.visit('/');
  });

  it('Create Article', () => {
    ({ user, article } = generateData());

    cy.login(user.email, user.username, user.password);
    cy.visit('/');
    cy.contains(user.username.toLowerCase()).should('be.visible');

    cy.contains('.nav-link', 'New Article').click();
    cy.url().should('include', '/editor');

    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]').type(
      article.description
    );
    cy.get('[placeholder="Write your article (in markdown)"]').type(
      article.body
    );
    article.tags.forEach((tag) => {
      cy.get('[placeholder="Enter tags"]').type(`${tag}{enter}`);
    });

    cy.get('.btn').click();
    cy.contains('h1', article.title).should('be.visible');
  });

  it('Delete Article', () => {
    ({ user, article } = generateData());

    cy.login(user.email, user.username, user.password);
    cy.visit('/');
    cy.contains(user.username.toLowerCase()).should('be.visible');

    cy.createArticle(article.title, article.description, article.body);

    cy.visit('/');
    cy.contains('.nav-link', 'Global Feed').click();
    cy.contains('.preview-link > h1', article.title).should('exist');
    cy.contains('.preview-link > h1', article.title).click();

    cy.contains('.btn', 'Delete Article').should('be.visible');
    cy.contains('.btn', 'Delete Article').click();
  });
});
