/// <reference types='cypress' />

const { faker } = require('@faker-js/faker');

describe('Conduit Article Info', () => {

  const uniqueEmail = faker.internet.email();
  const uniqueUsername = faker.internet.userName();
  const uniquePassword = faker.internet.password();
  const articleTitle = faker.lorem.sentence();
  const articleDescription = faker.lorem.sentence();
  const articleBody = faker.lorem.paragraph();
  const articleTags = [faker.lorem.word(), faker.lorem.word()];

  before(() => {

    cy.visit('https://conduit.productionready.io/#/register');
    cy.get('input[placeholder="Username"]').type(uniqueUsername);
    cy.get('input[placeholder="Email"]').type(uniqueEmail);
    cy.get('input[placeholder="Password"]').type(uniquePassword);
    cy.get('button[type="submit"]').click();

    cy.contains('Your Feed', { timeout: 10000 }).should('be.visible');
  });

  beforeEach(() => {

    cy.visit('https://conduit.productionready.io/#/login');
    cy.get('input[placeholder="Email"]').type(uniqueEmail);
    cy.get('input[placeholder="Password"]').type(uniquePassword);
    cy.get('button[type="submit"]').click();

    cy.contains('Your Feed', { timeout: 10000 }).should('be.visible');
  });

  it('Creates an article', () => {

    cy.visit('https://conduit.productionready.io/#/editor');
    cy.get('input[placeholder="Article Title"]').type(articleTitle);
    cy.get('input[placeholder="What\'s this article about?"]').type(articleDescription);
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(articleBody);
    cy.get('input[placeholder="Enter tags"]').type(`${articleTags[0]}{enter}`);
    cy.get('input[placeholder="Enter tags"]').type(`${articleTags[1]}{enter}`);
    cy.get('button[type="button"]').contains('Publish Article').click();

    cy.contains(articleTitle, { timeout: 10000 }).should('be.visible');
    cy.url().should('include', 'article');
  });

  it('Deletes an article', () => {

    cy.visit('https://conduit.productionready.io/#/editor');
    cy.get('input[placeholder="Article Title"]').type(articleTitle);
    cy.get('input[placeholder="What\'s this article about?"]').type(articleDescription);
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(articleBody);
    cy.get('input[placeholder="Enter tags"]').type(`${articleTags[0]}{enter}`);
    cy.get('input[placeholder="Enter tags"]').type(`${articleTags[1]}{enter}`);
    cy.get('button[type="button"]').contains('Publish Article').click();

    cy.contains(articleTitle, { timeout: 10000 }).should('be.visible');

    cy.get('.article-meta').within(() => {
      cy.contains('Delete Article').click();
    });
  });
});