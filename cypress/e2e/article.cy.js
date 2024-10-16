/// <reference types='cypress' />

describe('Conduit article flow', () => {
  let user;
  let articleData;
  let slug;

  before(() => {
    cy.visit('');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateDataForArticle').then((generateDataForArticle) => {
      articleData = generateDataForArticle;
    });

    beforeEach(() => {
      cy.login(user.email, user.username, user.password);
    });
  });

  it('should log in the user', () => {
    cy.contains('a.nav-link', user.username).should('be.visible');
  });

  it('should navigate to the article editor', () => {
    cy.visit('/editor');

    cy.url().should('contain', '/editor');
  });

  it('should fill the article form', () => {
    cy.visit('/editor');

    cy.get('[placeholder="Article Title"]')
      .type(articleData.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(articleData.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(articleData.body);

    cy.contains('.btn', 'Publish Article').click();

    cy.url().should('contain', '/article/');

    cy.get('h1').should('have.text', articleData.title);
  });

  it('should delete the article', () => {
    cy.visit(`/article/${slug}`);

    cy.contains('.btn', 'Delete Article').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/');

    cy.get('.article-preview')
      .should('have.text', 'No articles are here... yet');
  });
});
