describe('Test', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      return cy.task('generateArticle');
    }).then((generateArticle) => {
      article = generateArticle;

      cy.login(user.email, user.username, user.password);
    });
  });

  it('should create article', () => {
    cy.visit('/editor');

    cy.findByPlaceholder(`Article Title`).type(article.title);
    cy.findByPlaceholder(`What's this article about?`).type(article.description);
    cy.findByPlaceholder(`Write your article (in markdown)`).type(article.body);

    cy.get('.btn').click();

    cy.get(':nth-child(4) > .nav-link').click();

    cy.reload();

    cy.get('h1').should('contain.text', `${article.title}`);
  });

  it('should delete article', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slugUr = response.body.article.slug;

        cy.visit(`article/${slugUr}`);

        cy.contains('.btn', 'Delete Article').click();

        cy.get(':nth-child(4) > .nav-link').click();

        cy.get('.article-preview')
          .should('contain.text', 'No articles are here... yet.');
      });
  });
});
