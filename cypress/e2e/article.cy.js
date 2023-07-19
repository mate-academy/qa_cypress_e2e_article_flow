/// <reference types='cypress' />
/// <reference types='../support' />

describe('conduit article flow', () => {
  let article;

  beforeEach(() => {
    cy.task('newArticle').then((newArticle) => {
      const tags = 'Tag' + Cypress._.random(1, 10) + ',Tag' + Cypress._.random(11, 20);

      article = {
        title: 'Article Title ' + Cypress._.random(1, 100),
        description: 'Description ' + Cypress._.random(1, 100),
        body: 'Article Body ' + Cypress._.random(1, 100),
        tags
      };

      cy.login().then(() => {
        cy.visit('/editor');
      });
    });
  });

  it('should allow to create article', () => {
    const title = 'Article Title ' + Cypress._.random(1, 100);
    const description = 'Description ' + Cypress._.random(1, 100);
    const body = 'Article Body ' + Cypress._.random(1, 100);
    const tags = 'Tag' + Cypress._.random(1, 10) + ',Tag' + Cypress._.random(11, 20);

    article.tags = tags;

    cy.get('[placeholder="Article Title"]').type(title);
    cy.get('[placeholder="What\'s this article about?"]').type(description);
    cy.get('[placeholder="Write your article (in markdown)"]').type(body);
    cy.get('[placeholder="Enter tags"]').type(tags);

    cy.contains('button', 'Publish Article').click();
    cy.url().should('include', '/article/');
  });

  it('should allow to delete the article', () => {
    cy.get('[href="/editor"]').click();

    cy.findByPlaceholder('Article Title').type(article.title);

    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);

    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);

    cy.findByPlaceholder('Enter tags').type(article.tags);

    cy.contains('button', 'Publish Article').click();

    cy.get('h1').should('contain', article.title);

    cy.contains('button', 'Delete Article').click();

    cy.contains('a', 'Your Feed').should('be.visible');

    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
