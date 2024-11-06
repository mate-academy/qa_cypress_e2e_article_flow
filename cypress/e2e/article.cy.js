const { generateInputForArticle } =
  require('../support/generateInputForArticle');

describe('article page tests', () => {
  before(() => {
    cy.visit('/');
  });

  it('should delete article', () => {
    cy.task('generateUser').then((user) => {
      const { email, username, password } = user;

      cy.login(email, username, password);

      const { title, description, body } = generateInputForArticle();

      cy.createArticle(title, description, body);

      cy.visit('/');

      cy.get(':nth-child(4) > .nav-link').click();

      cy.reload();

      cy.get('h1').should('contain.text', title).click();

      cy.get('.container > .article-meta > ' +
        ':nth-child(3) > .btn-outline-danger').click();

      cy.get(':nth-child(4) > .nav-link').click();

      cy.reload();

      cy.get('.article-preview')
        .should('contain.text', 'No articles are here... yet.');
    });
  });
});
