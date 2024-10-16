/// <reference types='cypress' />

describe('Conduit', () => {
  const userName = 'nevermore';
  const email = 'nevermore@gmail.com';
  const password = 'nevermore123';
  const title = 'title';
  const description = 'description';
  const body = 'body';

  beforeEach(() => {
    cy.visit('/');
    cy.login(email, userName, password);
  });

  it('should create article with valid data', () => {
    cy.reload();
    cy.contains('a', 'New Article').click();
    cy.get('[placeholder="Article Title"]').type(title);
    cy.get('[placeholder="What\'s this article about?"]').type(description);
    cy.get('[placeholder="Write your article (in markdown)"]').type(body);
    cy.get('.btn-primary').click();
    cy.get('.container').should('contain', title)
      .and('contain', 'Delete Article')
      .and('contain', 'Edit Article');
  });

  it('should delete article', () => {
    cy.createArticle(title, description, body);
    cy.contains('a', 'Global Feed').click();
    cy.contains('title').click();
    cy.get('.article-actions').find('.btn-outline-danger').click();
    cy.url().should('include', '/');
  });
});
