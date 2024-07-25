describe('Article Flow', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('newUser').then((newUser) => {
      user = newUser;
    });

    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });
  });

  it('should create an article', () => {
    cy.login(user.username, user.email, user.password);

    cy.visit('/editor');

    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.get(`[placeholder="What's this article about?"]`)
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.findByPlaceholder('Enter tags')
      .type(`${article.tag}{enter}`);

    cy.get('.btn').click();
    cy.get('h1').should('contain.text', article.title);
  });

  it('should delete the article', () => {
    cy.login(user.username, user.email, user.password);

    cy.createArticle(
      article.title,
      article.description,
      article.body,
      article.tag
    ).then((response) => {
      const slug = response.body.article.slug;
      cy.visit(`/article/${slug}`);
    });

    cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-danger')
      .click();

    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
