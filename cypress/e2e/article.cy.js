/// <reference types='cypress' />

const { createArticle } = require('../support/createArticle');
const { createUser } = require('../support/createUser');

describe('Artic flow', () => {
  beforeEach(() => {
    cy.visit('/');

    const { email, username, password } = createUser();

    cy.login(email, username, password);
  });

  it('create article', () => {
    cy.visit('/editor');

    cy.get('[placeholder="Article Title"]').type('My title');
    cy.get(`[placeholder="What's this article about?"]`).type('About my title');
    cy.get(`[placeholder="Write your article (in markdown)"]`).type('Title about my title');
    cy.get(`[placeholder="Enter tags"]`).type('Title{Enter}Article{Enter}Markdown{Enter}');

    cy.contains('.btn', 'Publish Article').click();

    cy.contains('h1', 'My title');
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
