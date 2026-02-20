const { generateArticle } = require('../support/generateArticle');

describe('Article flow', () => {
  beforeEach(() => {
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);
      cy.visit('/');
    });
  });

  it('should create an article', () => {
    const { title, description, text, tags } = generateArticle();

    cy.get('[href="/editor"]').click();
    cy.get('form').should('be.visible');
    cy.findByPlaceholder('Article Title').type(title);
    cy.findByPlaceholder(`What's this article about?`).type(description);
    cy.findByPlaceholder(`Write your article (in markdown)`).type(text);
    cy.findByPlaceholder(`Enter tags`).type(tags.join(', '));
    cy.get('.btn').click();
    cy.contains('h1', `${title}`).should('be.visible');
  });

  it('should delete an article', () => {
    const { title, description, text } = generateArticle();
    cy.createArticle(title, description, text);
    cy.contains('.nav-link', 'Global Feed').click();
    cy.contains('a.preview-link', title).click();
    cy.contains('.banner button', 'Delete Article')
      .click();
    cy.contains('.nav-link', 'Global Feed').click();
    cy.reload();
    cy.contains(title).should('not.exist');
  });
});
