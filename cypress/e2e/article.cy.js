describe('Article Testing', () => {
  // Assuming you need to log in before each test
  beforeEach(() => {
    // Visit the page
    cy.visit('https://conduit.mate.academy/');

    // Click "Sign In"
    cy.get('a[href="/user/login"]').click();

    // Fill in email and password
    cy.get('input[type="email"]').type('kotek@gmail.com');
    cy.get('input[type="password"]').type('#4425ASt');

    // Click the "Sign in" button
    cy.get('button[type="submit"]').click();
  });

  it('should create and delete an article', () => {
    // Click "New Article"
    cy.get('a[href="/editor"]').click();

    // Fill in article creation fields
    cy.get('input[placeholder="Article Title"]').type('Test Article');
    cy.get('input[placeholder="What\'s this article about?"]')
      .type('This is a test article');
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type('Lorem ipsum dolor sit amet');
    cy.get('input[placeholder="Enter tags"]').type('test, cypress');

    // Click "Publish Article"
    cy.get('button[type="button"]').contains('Publish Article').click();

    // Verify the article is created
    cy.contains('Test Article').should('exist');

    // Click "Delete Article"
    cy.get('button.btn-outline-danger').contains('Delete Article').click();

    // Verify the article is deleted
    cy.contains('No articles are here... yet.').should('exist');
  });
});
