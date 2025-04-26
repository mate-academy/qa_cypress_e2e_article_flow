// cypress/e2e/article.cy.js
describe('Article Management', () => {
  // Generate unique data for each test run
  const uniqueId = Date.now();
  const testUser = {
    email: `test${uniqueId}@cypress.io`,
    username: `testuser${uniqueId}`,
    password: 'Test1234!'
  };

  const article = {
    title: `Test Article ${uniqueId}`,
    description: `Test Description ${uniqueId}`,
    body: `Test Body ${uniqueId}`
  };

  before(() => {
    // Sign up before running tests
    cy.login(testUser.email, testUser.username, testUser.password);
  });

  it('should create a new article', () => {
    // Navigate to new article page
    cy.visit('/editor');

    // Fill article form
    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get('input[placeholder="What\'s this article about?"]').type(
      article.description
    );
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(
      article.body
    );

    // Publish article
    cy.get('button').contains('Publish Article').click();

    // Verify article was created
    cy.get('.article-content h1').should('contain', article.title);
    cy.get('.article-content p').should('contain', article.body);
  });

  it('should delete an existing article', () => {
    // Create article using custom command
    cy.createArticle(article.title, article.description, article.body);

    // Visit profile to find the article
    cy.visit('/profile/' + testUser.username);

    // Find and click on the article
    cy.get('.article-preview').contains(article.title).click();

    // Delete article
    cy.get('button').contains('Delete Article').click();

    // Verify article is deleted by checking we're back on profile page
    cy.url().should('include', '/profile/' + testUser.username);

    // Verify article no longer exists
    cy.get('.article-preview').contains(article.title).should('not.exist');
  });
});
