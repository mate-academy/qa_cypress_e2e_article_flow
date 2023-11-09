describe('Article flow', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should provide an ability to create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]')
      .type(article.title);
    cy.get('[placeholder^="What\'s this"]')
      .type(article.description);
    cy.get('[placeholder^="Write your"]')
      .type(article.body);
    cy.contains('button', 'Publish Article')
      .click();
  });

  it('should provide an ability to delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    // eslint-disable-next-line max-len
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`article/${response.body.article.slug}`);
      });
    cy.contains('Delete Article')
      .click();
    // eslint-disable-next-line max-len
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
