describe('', () => {
  let user;
  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('should provide an ability to create the article', () => {
    cy.visit('/user/register');
    cy.login(user);
    cy.getCookie('auth').should('exist');
    cy.createArticle().then((articleInfo) => {
      cy.deleteArticle(articleInfo);
    });
  });
});
