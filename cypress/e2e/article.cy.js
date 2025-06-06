const { generateArticle } = require('../support/generateArticle');
const { generateUser } = require('../support/generateUser');

describe('Article creation and deletion', () => {
  const { username, email, password } = generateUser();
  const { title, description, body } = generateArticle();

  before(() => {
    cy.visit('/');
    cy.login(email, username, password);
    cy.reload();
  });

  it('Should create and delete an article ', () => {
    cy.createArticle(title, description, body);
    cy.get('.nav > :nth-child(2) > .link').click();
    cy.get(':nth-child(2) > .preview-link > h1').should('contain', title);
    cy.get(':nth-child(2) > .preview-link > h1').click();
    // eslint-disable-next-line max-len
    cy.get('.article-actions > .article-meta > :nth-child(3) > .btn-outline-danger')
      .click();
    cy.get(':nth-child(4) > .nav-link').click();
    cy.contains('.article-preview', 'No articles are here... yet.');
  });
});
