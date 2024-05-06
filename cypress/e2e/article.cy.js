describe('conduit article flow', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then((newUser) => {
      user = newUser;
    });

    cy.task('generateArticle').then((newArticle) => {
      article = newArticle;
    });
  });

  it('should create a new article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholderText('Article Title').type(article.title);
    cy.findByPlaceholderText("What's this article about?").type(article.description);
    cy.findByPlaceholderText("Write your article (in markdown)").type(article.body);
    cy.findByPlaceholderText("Enter tags").type(article.tags);
    cy.get('.btn.btn-lg.pull-xs-right.btn-primary').click();
    cy.get('.banner').should('contain', article.title);
  });

  it('should delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body, article.tags).then((response) => {
      const slug = response.body.article.slug;
      cy.visit(`/article/${slug}`);
    });

    cy.get('.btn').contains('Delete Article').click();

    cy.get('.article-preview').should('contain.text', 'No articles are here... yet.');
  });
});
