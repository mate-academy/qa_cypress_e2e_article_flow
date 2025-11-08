import { faker } from '@faker-js/faker';
/// <reference types='cypress' />

describe('Article Blog site', () => {
  const user = {
    fullName: faker.string.alpha({ length: { min: 2, max: 20 } }).toLowerCase(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  const article = {
    title: faker.lorem.sentence({ min: 3, max: 8 }),
    description: faker.lorem.sentences(2),
    body: faker.lorem.paragraphs(5, '\n\n')
  };

  before(() => {
    cy.visit('https://conduit.mate.academy/');
  });

  it('should create and delete an article', () => {
    cy.contains('a.nav-link', 'Sign up')
      .should('have.attr', 'href', '/user/register')
      .click();
    cy.url().should('contain', '/register');
    cy.get('input[placeholder="Username"]').type((user.fullName).toString());
    cy.get('input[placeholder="Email"]').type((user.email).toString());
    cy.get('input[placeholder="Password"]').type((user.password).toString());
    cy.get('button[type="submit"]').should('have.text', 'Sign up').click();

    cy.get('a.nav-link[href="/editor"]').click();

    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get('input[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.get('button[type="button"]')
      .should('have.text', 'Publish Article').click();
    cy.url().should('contain', '/article/');

    cy.contains('button', 'Delete Article').click();
    /// cy.contains('button', 'OK').click();
    cy.url().should('eq', 'https://conduit.mate.academy/');
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
