describe('Article flow', () => {
  let userData;
  let articleData;

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      userData = generatedUser;
      cy.login(userData.email, userData.username, userData.password);
    });
    cy.task('generateArticle').then((generatedArticle) => {
      articleData = generatedArticle;
    });
  });

  it('Should delete and create an article', () => {
    cy.createArticle(
      articleData.title,
      articleData.description,
      articleData.body
    ).then((resp) => {
      cy.visit(`/article/${resp.slug}`);
      cy.get('button').contains('Delete').click();
      cy.on('window:confirm', () => true);
      cy.url().should('not.include', `/article/${resp.slug}`);
      cy.contains('No articles are here... yet.').should('exist');
    });
  });
});
