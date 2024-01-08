describe('Conduit app', () => {
  let article;
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });
    // cy.login();
  });

  it('should create the article with valid credentials', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findPlaceholder('Article Title')
      .type(article.title);
    cy.findPlaceholder(`What's this article about?`)
      .type(article.description);
    cy.findPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.get('.btn').click();
    cy.get('h1').should('contain', article.title);
  });

  it('should delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`/article/${response.body.article.slug}`);
      });

    cy.get('.btn').contains('Delete Article').click();
    cy.url().should('equal', Cypress.config().baseUrl);
    cy.contains('.article-preview', 'No articles are here... yet.');
  });
})
