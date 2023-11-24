describe('Create and delete article', () => {
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

  it('should create article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder(`What's this article about?`).type(article.description);
    cy.findByPlaceholder(`Write your article (in markdown)`).type(article.body);
    cy.contains('.btn', 'Publish').click();
    cy.get('h1').should('contain', article.title);
    cy.get('.col-md-12').should('exist', article.body);
  });

  it('should delete article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((slug) => {
        cy.visit(`article/${slug}`);
        cy.get('h1').should('contain', article.title);
        cy.get('.col-md-12').should('exist', article.body);
        cy.contains('.btn', 'Delete Article').click();
        cy.url().should('equal', Cypress.config().baseUrl);
        cy.get('.article-preview')
          .should('contain', 'No articles are here... yet.');
      });
  });
});
