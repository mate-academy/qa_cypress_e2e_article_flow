describe('Conduit Article Flow', () => {
  const uniqueId = Date.now();
  const email = `user_${uniqueId}@test.com`;
  const username = `user_${uniqueId}`;
  const password = 'TestPassword123!';

  before(() => {
    cy.register(email, username, password); // register once
  });

  beforeEach(() => {
    cy.login(email, password); // login before every test
  });

  it('should create an article', () => {
    cy.createArticle(
      `Article ${uniqueId}`,
      'Test article description',
      'This is the article body',
      ['cypress', 'testing']
    ).then((slug) => {
      expect(slug).to.contain('article');
    });
  });

  it('should delete an article', () => {
    cy.createArticle(
      `To Delete ${uniqueId}`,
      'Delete me description',
      'Delete me body'
    ).then((slug) => {
      cy.deleteArticle(slug).then((resp) => {
        expect(resp.status).to.eq(204);

        // verify article is gone
        cy.request({
          method: 'GET',
          url: `/api/articles/${slug}`,
          failOnStatusCode: false,
        }).then((getResp) => {
          expect(getResp.status).to.eq(404);
        });
      });
    });
  });
});
