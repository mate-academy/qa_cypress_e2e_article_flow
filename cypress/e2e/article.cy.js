// @ts-nocheck
describe('Test Article Flow', () => {
  beforeEach(() => {
    cy.task('generateUser')
      .then((user) => {
        cy.wrap(user).as('user');
        cy.login(user.email, user.username, user.password);
      })
      .then(() => {
        cy.task('generateArticle').then((article) => {
          cy.wrap(article).as('article');
          cy.createArticle(article.title, article.description, article.body);
        });
      });
  });

  it('should create an article and see it in profile', function () {
    cy.visit(`/profile/${this.user.username.toLowerCase()}`);
    cy.contains('h1', this.article.title).should('be.visible');
  });

  it('should delete the article', function () {
    cy.visit(`/profile/${this.user.username.toLowerCase()}`);
    cy.contains('h1', this.article.title).click();
    cy.contains('button', 'Delete Article').click();
    cy.contains('.article-preview', 'No articles are here... yet.').should(
      'be.visible'
    );
  });
});
