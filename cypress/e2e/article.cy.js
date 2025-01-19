describe('Article Creation and Deletion Flow', () => {
  let userData;
  let articleData;

  before(() => {
    // Generate unique data for sign-in and article creation
    cy.fixture('user').then((user) => {
      userData = {
        username: `user_${Date.now()}`, // Generate unique username
        email: `user_${Date.now()}@test.com`, // Unique email
        password: 'TestPassword123'
      };
    });

    cy.fixture('article').then((article) => {
      articleData = {
        title: `Test Article ${Date.now()}`, // Unique article title
        description: 'This is a description of the test article.',
        body: 'This is the body of the test article.'
      };
    });
  });

  it('should sign in and create an article', () => {
    // Sign in using the login command
    cy.login(userData.email, userData.password);

    // Create the article
    cy.createArticle(articleData.title,
      articleData.description, articleData.body);

    // Verify that the article has been created
    cy.contains(articleData.title).should('be.visible');
  });

  it('should delete the created article', () => {
    // Ensure the article exists before attempting to delete it
    cy.contains(articleData.title).click(); // Click on the article

    // Delete the article
    cy.get('button.delete').click(); // Assuming delete button is a button with the class 'delete'

    // Verify that the article is deleted
    cy.contains(articleData.title).should('not.exist');
  });
});
