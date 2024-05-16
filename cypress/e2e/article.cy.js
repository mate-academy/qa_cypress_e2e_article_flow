/// <reference types="cypress" />

describe('Article flow', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('Create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');

    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder(`What's this article about?`).type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(`${article.tag}{enter}`);

    cy.get('.btn').click();

    cy.get('h1').should('contain.text', article.title);
  });

  it('Delete the article', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(
      article.title,
      article.description,
      article.body,
      article.tag);
    
    cy.visit('/');

    cy.contains('.nav-link', 'Global Feed').click();
    cy.contains('.preview-link', article.title).click();
    cy.url().should('contain', article.title);

    cy.contains('.btn', 'Delete Article').click();
    cy.url().should('not.contain', article.title);
  });
});
