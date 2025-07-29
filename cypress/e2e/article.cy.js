describe('Conduit', () => {
  const random = `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  const title = `Article Title ${random}`;
  const description = `This is a test article created at ${random}`;
  const body = `Body content for article ${random}`;

  const userName = `user${random}`;
  const email = `testuser${random}@test.com`;
  const password = 'Test123!';

  before(() => {
    cy.visit('/');
    cy.login(email, userName, password);
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('should create and delete article', () => {
    cy.reload();
    cy.contains('a', 'New Article').click();
    cy.get('[placeholder="Article Title"]').type(title);
    cy.get('[placeholder="What\'s this article about?"]').type(description); // no change needed here since the apostrophe is escaped
    cy.get('[placeholder="Write your article (in markdown)"]').type(body);
    cy.get('.btn-primary').click();
    cy.get('.container')
      .should('contain', title)
      .and('contain', 'Delete Article')
      .and('contain', 'Edit Article');
    cy.get('.article-actions').find('.btn-outline-danger').click();
    cy.url().should('include', '/');
  });
});
