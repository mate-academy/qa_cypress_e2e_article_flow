describe('Article flow', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should allow to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder(`What's this article about?`).type(article.body);
    cy.findByPlaceholder('Write your article (in markdown)', 'textarea')
      .type(article.description);
    cy.get('.btn')
      .contains('Publish Article').click();

    cy.get('h1')
      .should('contain', article.title);
  });

  it('should allow to delete an article', () => {
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
