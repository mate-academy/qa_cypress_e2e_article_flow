/// <reference types='cypress' />

const { createArticle } = require('../support/createArticle');

describe('Artic flow', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.task('generateUser')
      .then(
        ({ email, username, password }) => (cy.login(email, username, password))
      );
  });

  it('create article', () => {
    const { title, description, body } = createArticle();

    cy.visit('/editor');

    cy.get('[placeholder="Article Title"]').type(title);
    cy.get(`[placeholder="What's this article about?"]`).type(description);
    cy.get(`[placeholder="Write your article (in markdown)"]`).type(body);
    cy.get(`[placeholder="Enter tags"]`).type('Title{Enter}Article{Enter}Markdown{Enter}');

    cy.contains('.btn', 'Publish Article').click();

    cy.contains('h1', title);
  });

  it('delete article', () => {
    const { title, description, body } = createArticle();

    cy.createArticle(title, description, body);
    cy.visit('/');

    cy.contains('.link', 'Global Feed').click();

    cy.contains('a.preview-link', title).click();
    cy.contains('.banner button', 'Delete Article').click();
    cy.contains('.link', 'Global Feed').click();
    cy.reload();
    cy.contains(title).should('not.exist');
  });
});
