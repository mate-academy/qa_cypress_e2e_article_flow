/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

let articleTitle;
let articleDescription;
let articleBody;

describe('Article flow', () => {
  beforeEach(() => {
    // автентифікація перед кожним тестом
    cy.registerAndLogin();

    // генеруємо унікальні дані для статті
    articleTitle = 'Title ' + faker.string.alphanumeric(6);
    articleDescription = 'Description ' + faker.lorem.sentence();
    articleBody = 'Body ' + faker.lorem.paragraph();
  });

  it('Should create article via UI', () => {
    // Явний виклик логіну всередині тесту (вимога завдання)
    cy.registerAndLogin();

    cy.visit('/editor');

    cy.get('[name=title]').type(articleTitle);
    cy.get('[name=description]').type(articleDescription);
    cy.get('[name=body]').type(articleBody);

    cy.contains('button', 'Publish Article').click();

    cy.contains('h1', articleTitle).should('be.visible');
    cy.contains(articleDescription).should('be.visible');
    cy.contains(articleBody).should('be.visible');
  });

  it('Should delete article via UI after creating it via API', () => {
    cy.createArticle(articleTitle, articleDescription, articleBody);

    cy.contains('h1', articleTitle).should('be.visible');
    cy.contains('button', 'Delete Article').click();

    cy.url().should('include', Cypress.config().baseUrl);
  });
});
