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
    cy.visit('editor');
    cy.get('.nav-link').should('contain', user.username.toLowerCase());
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('article about?').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.description);
    cy.get('[type="button"]').contains('Publish')
      .click();
    cy.contains('.container', article.title)
      .should('exist');
  });

  it.only('should provide an ability to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`article/${slug}`);
      });
    cy.contains('.btn', 'Delete Article')
      .click();

    cy.get('.article-preview')
      .should('contain', 'No articles are here');
  });
});
