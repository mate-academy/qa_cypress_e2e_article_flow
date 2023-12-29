describe('', () => {
  let user;
  let article;

  before(() => {
  });
  beforeEach(() => {
    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('should create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);
  });

  it('should delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.deleteArticle(article.title, article.description, article.body);
  });
});
