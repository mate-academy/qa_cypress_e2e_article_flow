const { faker } = require('@faker-js/faker');

describe('Login, create, and delete an article', () => {
  const randomNumber = Math.floor(Math.random(1000) * 1000);
  const username = faker.person.firstName() + randomNumber;
  const email = username + '@example.com';
  const password = '12345Qwert!';
  const uniqueTitle = `Feel news ${Date.now()}`;
  const description = 'This article tells about how I feel';
  const body = 'I am feeling good today!';

  it('logs in, creates an article, and deletes it', () => {
    // Log in using the custom command
    cy.login(email, username, password);

    // Create an article using the custom command
    cy.createArticle(uniqueTitle, description, body);

    // Verify the article is visible in the UI
    cy.visit('/');
    cy.get('li.nav-item > a.nav-link').contains('Global Feed').click(); // Click "Global Feed"
    cy.get('.article-preview')
      .contains(`Article title: ${uniqueTitle}`) // Verify the article title is in the list
      .should('be.visible');

    // Open the article
    cy.get('.article-preview')
      .contains(`Article title: ${uniqueTitle}`)
      .click();

    // Delete the article
    cy.get('button.btn.btn-outline-danger.btn-sm')
      .contains('Delete Article')
      .click();

    // Confirm the deletion in the alert dialog
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you really want to delete it?');
      return true; // Simulates clicking "OK"
    });

    // Verify the article is deleted
    cy.get('.article-preview')
      .contains('No articles are here... yet.')
      .should('be.visible');
  });
});

/*
describe('Login and verify user profile', () => {
  before(() => {
    // Visit the login page
    cy.visit('https://conduit.mate.academy/user/login');
  });

  it('logs in and verifies the user profile', () => {
    cy.get('input[placeholder="Email"]')
      .type('jarkko.kilpelainen@protonmail.com');
    cy.get('input[placeholder="Password"]')
      .type('jarkko.kilpelainen@protonmail.com');

    cy.get('button[type="submit"]').contains('Sign in').click();

    cy.get('a.nav-link[href="/profile/jarkkokilpe"]').should('be.visible');

    // Click the "New Article" button
    cy.get('a.nav-link[href="/editor"]').click();
    cy.get('button.btn.btn-lg.pull-xs-right.btn-primary').should('be.visible');
    cy.get('input[placeholder="Article Title"]').type('Feel news');
    cy.get('input[placeholder="What\'s this article about?"]')
      .type('This article tells about how I feel');
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type('I am feeling good today!');
    cy.get('input[placeholder="Enter tags"]').type('feeling, feel, good,');
    cy.get('button.btn.btn-lg.pull-xs-right.btn-primary').click();
    cy.get('h1').contains('Feel news').should('be.visible');

    // Delete the article
    cy.get('button.btn.btn-outline-danger.btn-sm')
      .contains('Delete Article').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you really want to delete it?');
      return true;
    });
    cy.get('.article-preview')
      .contains('No articles are here... yet.')
      .should('be.visible');
  });
});
*/
