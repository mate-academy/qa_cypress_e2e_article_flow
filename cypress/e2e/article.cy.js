/// <reference types="cypress" />
const faker = require('faker');

describe('check Article flow', () => {
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      const user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
  });

  it('should create the article', () => {
    const title = faker.lorem.sentence();
    cy.visit('/editor');

    cy.get('[placeholder="Article Title"]').type(title);
    cy.get('.btn').click();

    cy.visit('/');
    cy.contains('Global Feed').click();
    cy.get('.article-preview').should('contain.text', title);
  });

  it('should delete the article', () => {
    cy.task('generateArticle').then((generateArticle) => {
      const article = generateArticle;
      cy.createArticle(article.title, article.description, article.body);

      cy.visit('/');
      cy.contains('Global Feed').click();
      cy.contains(article.title).click();
      cy.contains('.btn', ' Delete Article').click();

      cy.visit('/');
      cy.contains('Global Feed').click();
      cy.get('.preview-link').should('not.contain.text', article.title);
    });
  });
});
