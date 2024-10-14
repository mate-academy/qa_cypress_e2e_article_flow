/// <reference types='cypress' />

describe('Conduit', () => {
  const userName = 'nevermore';
  const email = 'nevermore@gmail.com';
  const password = 'nevermore123';
  beforeEach(() => {
    cy.visit('/');
    cy.login(email, userName, password);
  });

  it('should create article with valid data', () => {
    cy.createArticle('title', 'description', 'body');
  });

  it('should delete article', () => {
    cy.contains('a', 'Global Feed').click();
    cy.contains('title').click();
    cy.get('.article-actions').find('.btn-outline-danger').click();
  });
});
