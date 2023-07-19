/// <reference types = "cypress" />

/// <reference types = "../support"/>

describe('Article flow', () => {
  let article;
  let user;
  beforeEach(() => {
    cy.visit('https://conduit.mate.academy/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should allow to crate article ', () => {
    cy.loginConduit(user.email, user.username, user.password);
    cy.visit('https://conduit.mate.academy/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tags);
    // eslint-disable-next-line cypress/no-force
    cy.contains('button', 'Publish Article').click({ force: true });
    cy.get('h1').should('contain', article.title);
  });

  it('should allow to delete the article', () => {
    cy.loginConduit(user.email, user.username, user.password);
    cy.visit('https://conduit.mate.academy/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tags);
    // eslint-disable-next-line cypress/no-force
    cy.contains('button', 'Publish Article').click({ force: true });
    cy.get('h1').should('contain', article.title);
    cy.contains('button', 'Delete Article').click();
    cy.contains('a', 'Your Feed').should('be.visible');
    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
