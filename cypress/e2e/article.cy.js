/// <reference types='cypress' />

describe('Conduit article flow', () => {
  let user;
  let dataforArticle;

  beforeEach(() => {
    cy.visit('');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateDataForArticle').then((generateDataForArticle) => {
      dataforArticle = generateDataForArticle;
    });
  });

  it('should create a new article', () => {
    cy.login(user.email, user.username, user.password);

    cy.visit('/editor');

    cy.get('[placeholder="Article Title"]')
      .type(dataforArticle.title);

    cy.get('[placeholder="What\'s this article about?"]')
      .type(dataforArticle.description);

    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(dataforArticle.body);

    cy.contains('.btn', 'Publish Article')
      .click();
  });

  it('should delete the article', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(
      dataforArticle.title,
      dataforArticle.description,
      dataforArticle.body
    )
      .then((response) => {
        const slug = response.body.article.slug;

        cy.visit(`article/${slug}`);
      });

    cy.contains('.btn', 'Delete Article')
      .click();

    cy.url().should('equal', Cypress.config().baseUrl);

    cy.get('.article-preview')
      .should('have.text', 'No articles are here... yet');
  });
});
