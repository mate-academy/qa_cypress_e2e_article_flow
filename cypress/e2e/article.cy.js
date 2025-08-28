describe('', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user.email, user.username, user.password);

      cy.visit('/');
    });
  });

  it('should create an article and check it exists', () => {
    cy.task('generateArticle').then((generatedArticle) => {
      cy.createArticle({
        title: generatedArticle.title,
        description: generatedArticle.description,
        body: generatedArticle.body,
        tags: generatedArticle.tags
      });

      cy.contains('a', 'Global Feed').click();
      cy.get('.col-md-9').contains(user.username.toLowerCase())
        .should('be.visible');
      cy.get('.col-md-9').contains(generatedArticle.title)
        .should('be.visible');
    });
  });

  it('should create another article and delete it', () => {
    cy.task('generateArticle').then((generatedArticle) => {
      cy.createArticle({
        title: generatedArticle.title,
        description: generatedArticle.description,
        body: generatedArticle.body,
        tags: generatedArticle.tags
      });

      cy.contains('a', 'Global Feed').click();
      cy.get('.col-md-9').contains(generatedArticle.title)
        .should('be.visible').click();

      cy.intercept('DELETE', '/api/articles/*').as('deleteArticle');
      cy.contains('button', 'Delete Article').click();
      cy.wait('@deleteArticle');

      cy.visit('/');
      cy.contains('a', 'Global Feed').click();
      cy.get('.col-md-9').contains(generatedArticle.title)
        .should('not.exist');
    });
  });
});
