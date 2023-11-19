describe('Article flow', () => {
  let user;
  let article;

  before(() => {
    cy.fixture('example.json').then((data) => {
      user = data;
      cy.login(user.email, user.password);
    });
  });

  it('Create the article', () => {
    cy.createArticle(user.name, user.body).then((response) => {
      article = response.body.article;
      cy.visit(`/article/${article.slug}`);
      cy.get('h1').should('contain', user.name);
    });
  });

  it('Delete the article', () => {
    cy.deleteArticle(article.slug);
    cy.visit(`/article/${article.slug}`);
    cy.get('h1').should('not.exist');
  });
});
