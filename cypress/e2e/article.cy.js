describe('', () => {
  before(() => {
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);
    });
  });

  it('create an article', () => {
    let newArticle;
    cy.visit('editor');
    cy.task('generateArticle').then((article) => {
      newArticle = article;
      cy.get(':nth-child(1) > .form-control').type(newArticle.articleTitle);
      cy.get(':nth-child(2) > .form-control').type(newArticle.articleAbout);
      cy.get(':nth-child(3) > .form-control').type(newArticle.article);
      cy.get('.btn').click();
      cy.get('h1').should('contain', newArticle.articleTitle);
      cy.get('div > p').should('contain', newArticle.article);
    });
  });

  it.only('delete an article', () => {
    cy.task('generateArticle').then((article) => {
      cy.createArticle(
        article.articleTitle,
        article.articleAbout,
        article.article
      );
      cy.visit('/');
      cy.get(':nth-child(4) > .nav-link').click();
      cy.get('.article-preview h1').contains(article.articleTitle).click();
      cy.get('button').contains('Delete Article').click();
      cy.get('.article-preview').contains('No articles are here... yet.');
    });
  });
});
