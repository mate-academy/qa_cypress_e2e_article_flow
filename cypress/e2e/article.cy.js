/// <reference types='cypress' />

describe('', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should provide an ability to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/');
    cy.get('a[href="/editor"]')
      .click();
    cy.get('[placeholder="Article Title"]')
      .type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.get('button[type="button"]')
      .click();
    cy.get('.banner')
      .should('contain', article.title);
    cy.get('.row.article-content')
      .should('contain', article.body);
    cy.get('.btn.btn-outline-secondary.btn-sm')
      .should('exist');
    cy.get('.btn.btn-outline-danger.btn-sm')
      .should('exist');
  });

  it('should provide an ability to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`article/${response.body.article.slug}`);
      });
    cy.get('.btn.btn-outline-danger.btn-sm')
      .eq(0)
      .click();
    cy.url().should('equal', 'https://conduit.mate.academy/');
  });
});
