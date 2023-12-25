describe('Conduit article', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });

    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });
  });

  it('should create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);
    cy.visit('profile/' + (user.username).toLowerCase());
    cy.get('h1').click();
    cy.get('button').contains('Delete Article').click();
    cy.get('.article-preview').should('contain', 'No articles are here... yet.');
  });
});
