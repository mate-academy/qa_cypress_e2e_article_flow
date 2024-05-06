describe('Article page', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((newUser) => {
      user = newUser;
    });

    cy.task('generateArticle').then((newArticle) => {
      article = newArticle;
    });

    cy.visit('/');
  });

  it('should provide an ability to create a new Article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.get('.btn.btn-lg.pull-xs-right.btn-primary').click();
    cy.get('.banner').should('contain', article.title);
  });

  it('should provide an ability to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`article/${slug}`);
      });

    cy.contains('.btn', 'Delete Article').click();
    cy.get('.article-preview').should('contain', 'No articles are here');
  });
});
