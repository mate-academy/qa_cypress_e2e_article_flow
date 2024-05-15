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

  it('Should create a new article', () => {
    cy.login(user.email, user.username, user.password);

    cy.visit('/editor');

    cy.findByPlaceholder('Article Title').type(article.title);

    cy.findByPlaceholder(`What's this article about?`).type(article.description);

    cy.findByPlaceholder(`Write your article (in markdown)`).type(article.body);

    cy.findByPlaceholder(`Enter tags`).type(`${article.tag}{enter}`);

    cy.get('.btn').click();

    cy.get('h1').should('contain.text', article.title);
  });

  it('Should delete an article', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(
      article.title,
      article.description,
      article.body,
      article.tag
    ).then((response) => {
      const slug = response.body.article.slug;
      cy.visit(`/article/${slug}`);
    });
    // eslint-disable-next-line max-len
    cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-danger')
      .click();

    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
