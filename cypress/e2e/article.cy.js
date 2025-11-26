/* eslint-disable max-len */
const { generateArticle } = require('../support/generateArticle');
describe('test conduit site', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should create an article', () => {
    cy.assertPageUrl('');
    const { title, description, body } = generateArticle();
    cy.log(title, description, body);
    cy.task('generateUser').then((user) => {
      cy.log(user.email, user.username, user.password);
      // cy.login(user.email, user.username, user.password);

      // cy.createArticle(title, description, body);

      cy.get('a.nav-link').contains('Sign in').click();
      cy.findByPlaceholder('Email').type(user.email);
      cy.findByPlaceholder('Password').type(user.password);
      cy.get('.btn').contains('Sign in').click();
      cy.get(':nth-child(4) > .nav-link').should(
        'contain',
        user.username.toString().toLowerCase()
      );

      cy.get('a[href = "/editor"]')
        .should('contain', 'New Article').click();

      cy.get('[placeholder="Article Title"]').as('art');
      cy.get('@art').type(title);
      cy.get(`[placeholder="What's this article about?"]`).type(description);
      cy.get('[placeholder="Write your article (in markdown)"]').type(body);
      cy.get('button').should('contain', 'Publish Article').click();
      cy.get('h1').should('contain', title);
      cy.get('.col-md-12').should('contain', body);
      // cy.get('a.author').eq(0).click();
      // cy.get('a.preview-link').contains('Article description: ').should('contain', description);
      // cy.get('h1').click();

      /* cy.get(':nth-child(4) > .nav-link').should('contain', user.username.toString().toLowerCase()).click();

      cy.get('h1').should('contain', title);
      cy.get('.preview-link > p').should('contain', description);
      cy.get('a.preview-link').click();
      cy.get('div > p').should('contain', body); */
    });
  });

  it('should delete an article', () => {
    cy.assertPageUrl('');
    const { title, description, body } = generateArticle();
    cy.log(title, description, body);
    cy.task('generateUser').then((user) => {
      cy.log(user.email, user.username, user.password);
      // cy.login(user.email, user.username, user.password);

      // cy.createArticle(title, description, body);

      cy.get('a.nav-link').contains('Sign in').click();
      cy.findByPlaceholder('Email').type(user.email);
      cy.findByPlaceholder('Password').type(user.password);
      cy.get('.btn').contains('Sign in').click();
      cy.get(':nth-child(4) > .nav-link').should(
        'contain',
        user.username.toString().toLowerCase()
      );

      cy.get('a[href = "/editor"]').should('contain', 'New Article').click();

      cy.get('[placeholder="Article Title"]').as('art');
      cy.get('@art').type(title);
      cy.get(`[placeholder="What's this article about?"]`).type(description);
      cy.get('[placeholder="Write your article (in markdown)"]').type(body);
      cy.get('button').should('contain', 'Publish Article').click();
      cy.get('h1').should('contain', title);
      cy.get('.col-md-12').should('contain', body);
      // cy.get('a.author').eq(0).click();
      // cy.get('a.preview-link').contains('Article description: ').should('contain', description);
      // cy.get('h1').click();
      cy.get('button.btn.btn-outline-danger.btn-sm')
        .eq(1)
        .contains(' Delete Article')
        .click();
      cy.get('.article-preview').should(
        'have.text',
        'No articles are here... yet.'
      );

      /* cy.get(':nth-child(4) > .nav-link').should('contain', user.username.toString().toLowerCase()).click();

      cy.get('h1').should('contain', title);
      cy.get('.preview-link > p').should('contain', description);
      cy.get('a.preview-link').click();
      cy.get('div > p').should('contain', body); */
    });
  });
});
