describe('Test', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser();
    });

    cy.task('articleInput').then((articleInput) => {
      article = articleInput();
    });
  });

  it('should create article', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(article.title, article.description, article.body);

    cy.visit(`/`);

    cy.get(':nth-child(4) > .nav-link').click();

    cy.get('h1').should('contain.text', `${article.title}`);
  });

  it('should delete article', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slugUrl = response.body.article.slug;

        cy.visit(`article/${slugUrl}`);

        cy.contains('.btn', 'Delete Article').click();

        cy.get(':nth-child(4) > .nav-link').click();

        cy.get('.article-preview')
          .should('contain.text', 'No articles are here... yet.');
      });
  });
});
