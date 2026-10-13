// cypress/e2e/article.cy.js

const generateUniqueId = () => Math.random().toString(36).substring(2, 10);

describe('Article flow', () => {
  let user;

  before(() => {
    const uniqueId = generateUniqueId();
    user = {
      username: `testuser_${uniqueId}`,
      email: `testuser_${uniqueId}@mail.com`,
      password: 'TestPass123!'
    };
    cy.register(user.username, user.email, user.password);
  });

  beforeEach(() => {
    // Login automatically visits the homepage
    cy.login(user.email, user.password);
  });

  it('should create a new article', () => {
    const uniqueId = generateUniqueId();
    const article = {
      title: `Test Article ${uniqueId}`,
      description: `Description ${uniqueId}`,
      body: `Body content for ${uniqueId}`
    };

    // UI Interactions for Creating an Article
    cy.contains('New Article').click();

    // ADDED: Wait for the URL to change to /editor before typing
    cy.url().should('include', '/editor');

    // Updated selectors to match Conduit's placeholders
    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get('input[placeholder="What\'s this article about?"]').type(
      article.description
    );
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(
      article.body
    );
    cy.get('input[placeholder="Enter tags"]').type('test{enter}');

    cy.contains('Publish Article').click();

    // Assertions
    cy.url().should('include', '/article/');
    cy.contains(article.title).should('be.visible');
  });

  it('should delete an existing article', () => {
    const uniqueId = generateUniqueId();
    const articleToDelete = {
      title: `Delete Me ${uniqueId}`,
      description: `Description for deletion ${uniqueId}`,
      body: `Body content to delete ${uniqueId}`,
      tagList: ['delete', 'test']
    };

    // 1. Create the article via API
    cy.createArticle(articleToDelete);

    // 2. Navigate to profile and click the article
    cy.visit(`/profile/${user.username}`);
    cy.url().should('include', '/profile/');
    cy.contains(articleToDelete.title).click();
    cy.url().should('include', '/article/');

    // 3. Tell Cypress to automatically confirm the popup
    cy.on('window:confirm', () => true);

    // 4. Click the Delete button
    cy.contains('Delete Article').click();

    // 5. Assertions
    cy.url().should('not.include', '/article/');

    // UPDATED: Only look for an <a> tag (link), not a span/div (tag)
    cy.contains('a', articleToDelete.title).should('not.exist');
  });
});
