/* eslint-disable max-len */
/// <reference types="Cypress" />

import { generateArticle } from '../support/generateArticle';
import { generateUser } from '../support/generateUser';
import { generateUser2 } from '../support/generateUser2';

describe('Creating an article', () => {
  const article = generateArticle();
  const user = generateUser();
  const user2 = generateUser2();

  before(() => {
    cy.visit('https://conduit.mate.academy/');
  });

  it('should allow to create new article', () => {
    cy.register(user.username, user.email, user.password);
    cy.login(user.email, user.password);
    cy.reload();
    cy.contains('.nav-link', 'New Article').click();

    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.contains('[type="button"]', 'Publish Article').click();

    cy.get('.article-page').should('contain', article.body);
  });

  it('should allow to delete an article', () => {
    cy.register(user2.username, user2.email, user2.password);
    cy.login(user2.email, user2.password);
    cy.reload();

    cy.createArticle(article.title, article.description, article.body);
    cy.reload();
    user2.username = user2.username.toLowerCase();
    cy.visit(`https://conduit.mate.academy/profile/${user2.username}/`);
    cy.contains('h1', article.title).click();
    cy.contains('button', ' Delete Article').click();

    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you really want to delete it?');
      return true;
    });

    cy.visit(`https://conduit.mate.academy/profile/${user2.username}/`);
    cy.get('.article-preview').should('contain', 'No articles are here... yet.');
  });
});
