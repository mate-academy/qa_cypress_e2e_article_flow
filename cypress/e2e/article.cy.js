describe('', () => {
  before(() => {
  });

  it('create an article', () => {
    let newArticle;
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);
    });
    cy.visit('editor');
    cy.task('generateArticle').then((article) => {
      newArticle = article;
      cy.findByPlaceHolder('Article Title').type(newArticle.articleTitle);
      cy.findByPlaceHolder('What\'s this article about?')
        .type(newArticle.articleAbout);
      cy.findByPlaceHolder('Write your article (in markdown)')
        .type(newArticle.article);
      cy.get('.btn').click();
      cy.get('h1').should('contain', newArticle.articleTitle);
      cy.get('div > p').should('contain', newArticle.article);
    });
  });

  it('delete an article', () => {
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);
      cy.visit(`/profile/${user.username.toLowerCase()}`);
    });
    cy.task('generateArticle').then((article) => {
      cy.createArticle(
        article.articleTitle,
        article.articleAbout,
        article.article
      );
      cy.reload();
      cy.get('.articles-toggle').click();
      cy.get('.article-preview').contains(article.articleTitle).click();
      cy.get('button').contains('Delete Article').click();
      cy.get('.article-preview').contains('No articles are here... yet.');
    });
  });
});
