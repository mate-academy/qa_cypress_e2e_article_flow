/// <reference types='cypress' />

describe('Article creation and deletion', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be able to create the article', () => {
    // Generate unique user data
    cy.task('generateUser').then((user) => {
      const { email, username, password } = user;

      // Login with the generated user
      cy.login(email, username, password);

      // Generate unique article data
      cy.task('generateArticle').then((article) => {
        const { title, description, body, tag } = article;

        // Navigate to the article creation page
        cy.reload();
        cy.get('.container > .nav > :nth-child(2) > .nav-link').click();

        // Fill in the article creation form
        cy.get('[placeholder="Article Title"]').type(title);
        cy.get('[placeholder="What\'s this article about?"]').type(description);
        cy.get('[placeholder="Write your article (in markdown)"]').type(body);
        cy.get('[placeholder="Enter tags"]').type(tag);

        // Click Publish Article button
        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.get('.btn').focus().click();

        // Verify article creation
        cy.get('h1').should('contain', article.title);
      });
    });
  });

  it('should be able to delete the article', () => {
    // Generate unique user data for the test
    cy.task('generateUser').then((user) => {
      const { email, username, password } = user;

      // Log in using the generated user credentials
      cy.login(user.email, user.username, user.password);

      // Generate unique article data for the test
      cy.task('generateArticle').then((article) => {
        const { title, description, body } = article;

        // Create the article that will be deleted
        cy.createArticle(title, description, body); // Ensure this command is defined in your commands.js

        // Navigate to the home page
        cy.visit('');

        // Navigate to the "Global Feed" section
        cy.contains('.nav-link', 'Global Feed').click();

        // Find and click on the article title to view the article details
        cy.contains('.preview-link', article.title).click();

        // Verify that the article detail page displays the correct title
        cy.get('h1').should('contain', article.title);

        // Click the "Delete Article" button to remove the article
        cy.contains('.btn', 'Delete Article').click();

        // Verify that the URL no longer contains the article title
        cy.url().should('not.contain', article.title);

        // Verify that displays a message indicating no articles are available
        cy.get('.article-preview').should('contain', 'No articles are here.');
      });
    });
  });
});
