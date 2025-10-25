/* eslint-disable cypress/no-unnecessary-waiting */
const { faker } = require('@faker-js/faker');
const { generateArticle } = require('../support/generateArticle');
const { title, description, body, tags } = generateArticle();

describe('Article Flow', () => {
  beforeEach(() => {
    const randomNumber = faker.number.int({ min: 1000, max: 9999 });
    const username = faker.person.firstName() + String(randomNumber);
    const email = username + '@gmail.com';
    const password = '12345Qwert!';
    cy.visit('');
    cy.register(email, username, password);
  });

  it('should create the article', () => {
    cy.get('[href="/user/login"]')
      .click();
    cy.get('[href="/"]')
      .click({ multiple: true });
    cy.get('[href="/editor"]')
      .click();
    cy.createArticle(title, description, body, tags);
    cy.get('[href="/"]')
      .click({ multiple: true });
    cy.get('.nav > :nth-child(2) > .link')
      .click();
    cy.get(':nth-child(2) > .preview-link > h1')
      .should('have.text', `Article title: ${title}`);
  });

  it('should delete the article', () => {
    cy.get('[href="/user/login"]')
      .click();
    cy.get('[href="/"]')
      .click({ multiple: true });
    cy.createArticle(title, description, body, tags);
    cy.get('[href="/"]')
      .click({ multiple: true });
    cy.wait(500);
    cy.get('.nav > :nth-child(2) > .link')
      .click();
    cy.wait(500);
    cy.get(':nth-child(2) > .preview-link > h1')
      .click();
    // eslint-disable-next-line max-len
    cy.get('.article-actions > .article-meta > :nth-child(3) > .btn-outline-danger')
      .click();
    cy.get('.nav > :nth-child(2) > .link')
      .click();
    cy.get(':nth-child(2) > .preview-link > h1')
      .should('not.contain.text', `Article title: ${title}`);
  });
});
