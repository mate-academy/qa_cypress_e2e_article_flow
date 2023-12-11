describe('article flow test', () => {
  before(() => {
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);
    });
  });

  it('should create and delete an article', () => {
    cy.visit('https://conduit.mate.academy/editor');

    it('should create and delete an article', () => {
      // Create an article and capture the article slug
      cy.createArticle('Test Article',
        'This is a test description', 'Test article content');
      // Delete the created article
      cy.deleteArticle();
    });
  });
});
