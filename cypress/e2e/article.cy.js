/// <reference types="cypress" />

const { faker } = require('@faker-js/faker');
const { generateArticle } = require('../support/generateArticle');

describe('', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.visit('/');

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      const { email, username, password } = user;

      cy.contains('.nav-link', 'Sign up').click();

      cy.get('input[placeholder="Username"]').type(username);
      cy.get('input[placeholder="Email"]').type(email);
      cy.get('input[placeholder="Password"]').type(password + '{Enter}');
    });

    article = generateArticle();
  });

  it('should add article', () => {
    cy.contains('a', ' New Article').click();

    const title = faker.commerce.productName();
    const description = faker.commerce.productName();
    const body = faker.commerce.productName();

    cy.get('input[placeholder="Article Title"]').type(title);
    cy.get(`input[placeholder="What's this article about?"]`).type(description);
    cy.get(`textarea[placeholder="Write your article (in markdown)"]`).type(
      body
    );
    cy.contains('button', 'Publish Article').click();

    cy.contains('h1', title);
  });

  it('should delete the article', () => {
    cy.contains('a', ' New Article').click();

    const title = faker.commerce.productName();
    const description = faker.commerce.productName();
    const body = faker.commerce.productName();

    cy.get('input[placeholder="Article Title"]').type(title);
    cy.get(`input[placeholder="What's this article about?"]`).type(description);
    cy.get(`textarea[placeholder="Write your article (in markdown)"]`).type(
      body
    );
    cy.contains('button', 'Publish Article').click();

    cy.contains('h1', title);

    cy.contains('button', ' Delete Article').click();

    cy.contains('a', 'Global Feed').click();
    cy.contains('h1', `Article title: ${article.title}`).should('not.exist');
  });
});
