/// <reference types="cypress" />
const faker = require('faker');

describe('Article page deleting and creating', () => {
  let article;
  const deleteAlert = 'Do you really want to delete it?';
  beforeEach(() => {
    cy.visit('/');
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should provedi an ability to create an article ', () => {
    cy.login();
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder('What\'s this')
      .type(article.description);
    cy.findByPlaceholder('Write your')
      .type(article.body);
    cy.contains('.btn', 'Publish Article')
      .click();
    cy.contains('h1', article.title)
      .should('exist');
    cy.contains('p', article.body)
      .should('exist');
    cy.contains('.btn', 'Edit Article')
      .should('be.visible');
  });

  it('should provide an ability to delete created article', () => {
    cy.login();
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`/article/${response.body.article.slug}`);
        cy.contains('.btn', 'Delete Article')
          .eq(0)
          .click();
        cy.on('window:alert', (alert) => {
          expect('alert').to.equal(deleteAlert);
        });
        cy.contains('.link.nav-link', 'Global Feed')
          .click();
        cy.contains('.article-preview', article.title)
          .should('not.exist');
        cy.contains('.article-preview', article.description)
          .should('not.exist');
      });
    cy.url()
      .should('eq', 'https://conduit.mate.academy/')
  });
});
