describe('Article flow', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user.email, user.username, user.password).then(() => {
        cy.task('generateArticle').then((generatedArticle) => {
          article = generatedArticle;
          cy.createArticle(article.title, article.description, article.body);
        });
      });
    });
  });

  it('should create an article and see it in profile', () => {
    cy.visit(`/profile/${user.username.toLowerCase()}`);
    cy.contains('h1', article.title).should('be.visible');
  });

  it('should delete the article', () => {
    cy.visit(`/profile/${user.username.toLowerCase()}`);
    cy.contains('h1', article.title).click();
    cy.contains('button', 'Delete Article').click();
    cy.contains('.article-preview', 'No articles are here... yet.')
      .should('be.visible');
  });
});
