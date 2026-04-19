describe('Article flow', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.visit('/');
      cy.login(
        user.email, user.username, user.password
      );
    });
  });

  it('should create an article', () => {
    cy.task('generateArticle').then((article) => {
      cy.visit('/editor');

      cy.get(
        'input[placeholder="Article Title"]'
      ).type(article.title);
      cy.get(
        'input[placeholder="What\'s this article about?"]'
      ).type(article.description);
      cy.get(
        'textarea[placeholder="Write your article (in markdown)"]'
      ).type(article.body);
      cy.contains('button', 'Publish Article')
        .click();

      cy.url().should('include', '/article/');
      cy.get('h1').should('contain', article.title);
    });
  });

  it('should delete an article', () => {
    cy.task('generateArticle').then((article) => {
      cy.createArticle(
        article.title,
        article.description,
        article.body
      ).then((createdArticle) => {
        cy.visit(`/article/${createdArticle.slug}`);

        cy.contains('button', 'Delete Article')
          .click();

        cy.url().should(
          'eq', Cypress.config().baseUrl
        );
      });
    });
  });
});
