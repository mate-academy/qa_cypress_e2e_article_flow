describe('conduit_article', () => {
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

  it('should be able to create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');

    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]').type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.contains('Publish Article').click();

    cy.contains('h1', article.title).should('be.visible');
    cy.url().should('include', 'article');
  });

  it('should be able to delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`article/${response.body.article.slug}`);
      });
    cy.contains('.btn', 'Delete Article').click();
    cy.on('window:confirm', () => true);
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
    cy.url().should('include', '/');
  });
});
