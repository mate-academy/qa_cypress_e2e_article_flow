/// <reference types='cypress' />

import { generateArticle } from '../support/generateArticle';

describe('Article Page', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.task('generateUser')
      .as('user')
      .then(({ email, username, password }) => {
        cy.login(email, username, password);
        cy.visit('/');
      });
  });

  it('should create an article', () => {
    cy.contains('a', 'New Article').should('exist').click();

    const { title, description, body, tags } = generateArticle();

    cy.getByPlaceholder('Article Title').type(title);
    cy.getByPlaceholder(`What's this article about?`).type(description);
    cy.getByPlaceholder('Write your article (in markdown)').type(body);
    cy.getByPlaceholder('Enter tags').type(tags.join('{Enter}') + '{Enter}');

    cy.contains('button', 'Publish Article').should('exist').click();

    cy.contains('h1', title).should('exist');
    cy.contains('div p', body).should('exist');

    tags.forEach((tag) => {
      cy.contains('.tag-list li', tag).should('exist');
    });
  });

  it('should delete an article', function () {
    const { title, description, body } = generateArticle();

    cy.createArticle(title, description, body).then((article) => {
      cy.visit(`${Cypress.config('baseUrl')}/article/${article.slug}`);

      cy.contains('button', 'Delete Article').should('exist').click();
      cy.visit(`${Cypress.config('baseUrl')}/profile/${this.user.username}`);

      cy.contains('.article-preview', 'No articles are here... yet.');
    });
  });
});
