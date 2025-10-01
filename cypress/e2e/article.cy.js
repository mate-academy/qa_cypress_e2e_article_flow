describe('Conduit Article Flow', () => {
  const uniqueId = Date.now();
  const email = `user_${uniqueId}@test.com`;
  const username = `user_${uniqueId}`;
  const password = 'TestPassword123!';

  const articleData = {
    title: `Article ${uniqueId}`,
    description: 'Test article description',
    body: 'This is the article body for testing.',
    tags: ['cypress', 'testing'],
  };

  before(() => {
    // Register user once
    cy.register(email, username, password);
  });

  beforeEach(() => {
    // Login before each test to ensure localStorage is populated
    cy.login(email, password);
  });

  it('should create an article and verify it in the UI', () => {
    cy.createArticle(
      articleData.title,
      articleData.description,
      articleData.body,
      articleData.tags
    ).then((slug) => {
      // Visit the article page
      cy.visit(`/article/${slug}`);

      // Assert title, body, and tags are visible in the UI
      cy.contains(articleData.title).should('be.visible');
      cy.contains(articleData.body).should('be.visible');
      articleData.tags.forEach((tag) => {
        cy.contains(tag).should('be.visible');
      });
    });
  });

  describe('Delete Article Flow', () => {
    // Prepare article before deletion test
    beforeEach(function () {
      cy.createArticle(
        `To Delete ${uniqueId}`,
        'Delete me description',
        'Delete me body',
        ['delete', 'cypress']
      ).then((slug) => {
        cy.wrap(slug).as('slug'); // store slug as alias
      });
    });

    it('should delete the article', function () {
      cy.deleteArticle(this.slug).then((resp) => {
        expect(resp.status).to.eq(204);

        // Verify the article is gone
        cy.request({
          method: 'GET',
          url: `/api/articles/${this.slug}`,
          failOnStatusCode: false,
        }).then((getResp) => {
          expect(getResp.status).to.eq(404);
        });
      });
    });
  });
});
