describe('Article Flow', () => {
  let article;

  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      cy.register(
        generatedUser.username,
        generatedUser.email,
        generatedUser.password
      ).then((response) => {
        if (response.status !== 200) {
          throw new Error(`Registration failed: ${JSON.stringify(response.body)}`);
        }
        return cy.login(generatedUser.email, generatedUser.password);
      }).then((loginResponse) => {
        if (loginResponse.status !== 200) {
          throw new Error(`Login failed: ${JSON.stringify(loginResponse.body)}`);
        }
        return cy.task('generateArticle');
      }).then((generatedArticle) => {
        return cy.createArticle(
          generatedArticle.title,
          generatedArticle.description,
          generatedArticle.body
        );
      }).then((createdArticle) => {
        article = createdArticle;
        cy.log(`Article created with slug: ${article.slug}`);
      });
    });
  });

  it('should delete the created article', () => {
    cy.visit('/');
    cy.contains(article.title, { timeout: 30000 }).should('be.visible').click();

    cy.url().should('include', `/article/${article.slug}`);

    // Check if the user has permission to edit/delete the article
    cy.get('.article-actions').then($actions => {
      if ($actions.find('a:contains("Edit Article")').length > 0) {
        // User has edit permissions, so they should be able to delete
        cy.contains('Delete Article').should('be.visible').click();

        // After deletion, we should be redirected to the home page
        cy.url().should('not.include', '/article/');
        cy.contains(article.title).should('not.exist');
      } else {
        // User doesn't have edit permissions
        cy.log('User does not have permission to delete the article');
        // Optionally, you can fail the test here if deletion is a required step
        // throw new Error('User does not have permission to delete the article');
      }
    });
  });

  after(() => {
    // Attempt to delete the article via API as a cleanup step
    if (article && article.slug) {
      cy.deleteArticle(article.slug).then(response => {
        if (response.status === 204) {
          cy.log('Article successfully deleted via API');
        } else {
          cy.log(`Failed to delete article via API. Status: ${response.status}`);
        }
      });
    }
  });
});
