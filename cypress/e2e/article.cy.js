describe('Article flow', () => {
  let user;
  let articleTitle;

  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('should create article', () => {
    const numberOfArticles = Math.floor(Math.random() * 1000);
    articleTitle = `Cypress Test ${numberOfArticles}`;

    cy.contains(user.username.toLowerCase()).should('be.visible');

    cy.createArticle(articleTitle, 'Test description', 'Test body');

    cy.get('a.nav-link').contains('Global Feed').click();
    cy.contains(articleTitle).should('be.visible');
  });

  it('should delete article', () => {
    cy.get('a.nav-link').contains('Global Feed').click();
    cy.contains(articleTitle).should('be.visible').click();

    cy.get('.article-meta .btn-outline-danger').click();
    cy.get('a.nav-link').contains('Global Feed').click();
    cy.contains(articleTitle).should('not.exist');
  });
});
