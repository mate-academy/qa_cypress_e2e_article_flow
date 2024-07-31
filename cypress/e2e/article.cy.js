/* eslint-disable max-len */
import { faker } from "@faker-js/faker";

/// <reference types="cypress" />

describe('Conduit', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('');
    cy.contains('.nav-link', 'New Article').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article').type(article.body);
    cy.findByPlaceholder('Enter tags').type(`${article.tag}{enter}`);

    cy.get('[type="button"]').click();
    cy.url().should('contain', article.title);
    cy.get('h1').should('contain', article.title);
  });

  it('should allow to delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body, article.tagList);
    cy.visit('');
    cy.get(':nth-child(4) > .nav-link').click();
    cy.contains('h1', article.title).click();
    cy.contains('button', 'Delete Article').click();
    cy.url().should('not.contain', article.title);
  });
});
