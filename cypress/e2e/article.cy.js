/// <reference types="cypress" />

const { faker } = require('@faker-js/faker');
const { article } = require('../support/article');

describe('Create the article', () => {
  beforeEach(() => {
    cy.visit('/');
    const user = {
      userEmail: faker.internet.email(),
      username: faker.internet.userName(),
      userPassword: faker.internet.password()
    };
    cy.login(user.userEmail, user.username, user.userPassword);
  });

  it('The user is able to create the new article', () => {
    cy.reload();
    const userArticle = article();
    cy.createArticle(userArticle.title,
      userArticle.description, userArticle.body);
    cy.get(':nth-child(4) > .nav-link').click();
    cy.get('div.article-preview').get('.preview-link > h1 ')
      .should('have.text', `${userArticle.title}`);
    cy.get('.container').get('.navbar-brand')
      .contains('conduit').click();
    cy.get('.nav > :nth-child(2) > .link').click();
    cy.get('.row').get('.col-md-9').get('.article-preview')
      .get('.preview-link > h1').should('contain', `${userArticle.title}`);
  });

  it('The user is able to delete his article', () => {
    cy.reload();
    const userArticle = article();
    cy.createArticle(userArticle.title, userArticle.description,
      userArticle.body);
    cy.get(':nth-child(4) > .nav-link').click();
    cy.get('div.article-preview').get('.preview-link > h1').click();
    cy.get('button').contains('Delete Article').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal(`Do you really want to delete it?`);
    });
    cy.url().should('contain', 'https://conduit.mate.academy/');
    cy.get('.nav > :nth-child(2) > .link').click();
    cy.get('.row').get('.col-md-9').get('.article-preview')
      .get('.preview-link > h1').should('not.contain', `${userArticle.title}`);
  });
});
