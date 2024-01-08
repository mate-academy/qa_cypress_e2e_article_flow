describe('Conduit app', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.task('generateArticle').then((generateArticle) => {
        article = generateArticle;
        cy.login(user.email, user.username, user.password);
        cy.createArticle(article.title, article.description, article.body);
      });
    });
  });

  it('should be able to create an article', () => {
    cy.contains('.container', article.title).should('exist');
  });

  it('should be able to delete an article', () => {
    cy.contains('.btn', 'Delete Article').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you really want to delete it?');
    });
    cy.get('.article-preview').should('contain', 'No articles are here');
  });
});
