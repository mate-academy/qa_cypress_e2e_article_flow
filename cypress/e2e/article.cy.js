describe('Conduit article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });

    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });
  });

  it('should create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get(`[placeholder="What's this article about?"]`).type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.get('button').contains('Publish Article').click();
    cy.get('a').contains('Edit Article').should('contain', 'Edit Article');

  });

  it('should delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);
    cy.visit('profile/' + (user.username).toLowerCase());
    cy.get('h1').click();
    cy.get('button').contains('Delete Article').click();
    cy.get('.article-preview').should('contain', 'No articles are here... yet.');
  });
});
