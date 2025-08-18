/// <reference types='cypress' />;

describe('Article flow', () => {
  let user;
  let article;

  beforeEach(() => {
    // only generate and log in the user
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user.email, user.username, user.password);
    });
  });

  it('should create an article and see it in profile', () => {
    // generate a new article for this test
    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;

      // create the article inside the test
      cy.createArticle(article.title, article.description, article.body);

      // verify article appears in profile
      cy.visit(`/profile/${user.username.toLowerCase()}`);
      cy.contains('h1', article.title).should('be.visible');
    });
  });

  it('should delete the article', () => {
    // for deletion test, create article before the test
    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
      cy.createArticle(article.title, article.description, article.body);

      cy.visit(`/profile/${user.username.toLowerCase()}`);
      cy.contains('h1', article.title).click();
      cy.contains('button', 'Delete Article').click();
      cy.contains('.article-preview', 'No articles are here... yet.')
        .should('be.visible');
    });
  });
});
