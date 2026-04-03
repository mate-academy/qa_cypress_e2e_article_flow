/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Article Flow', () => {
  let user;
  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user.email, user.username, user.password);
      cy.visit('/', {
        timeout: 30000,
        onBeforeLoad(win) {
          Object.defineProperty(
            win.document, 'readyState', { get: () => 'complete' });
        }
      });
      cy.get('.navbar', { timeout: 40000 }).should('be.visible');
    });
  });

  it('should create a new article', () => {
    const articleTitle = faker.lorem.sentence();
    const articleDescription = faker.lorem.sentence();
    const articleBody = faker.lorem.paragraphs(1);
    cy.get('.navbar').should('be.visible');
    cy.get('a[href="/editor"]').click();
    cy.get('form').should('be.visible');
    cy.get('input[placeholder="Article Title"]').type(articleTitle);
    cy.get('input[placeholder="What\'s this article about?"]')
      .type(articleDescription);
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type(articleBody);
    cy.contains('button', 'Publish Article').should('be.visible').click();
    cy.get('h1').should('be.visible').and('contain', articleTitle);
    cy.get('.article-content').should('be.visible').and('contain', articleBody);
  });

  it('should delete an existing article', () => {
    const titleToDelete = 'Delete Me ' + faker.string.uuid();
    cy.createArticle(titleToDelete, 'Desc', 'Body');
    cy.visit('/');
    cy.contains('.nav-link', 'Global Feed').should('be.visible').click();
    cy.contains('.preview-link', titleToDelete, { timeout: 15000 }).click();
    cy.get('.banner').contains('button', 'Delete Article').click();
    cy.get('.article-preview').should('be.visible');
    cy.contains(titleToDelete).should('not.exist');
  });
});
