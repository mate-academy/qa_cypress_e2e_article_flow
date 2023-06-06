/// <reference types="cypress" />

describe('New article form', () => {
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

  it('should provide the ability to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder("What's this article about?")
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.contains('button', 'Publish Article').click();
    cy.get('.container')
      .should('contain', article.title)
      .and('contain', 'Edit Article')
      .and('contain', 'Delete Article');
    cy.get('.col-md-12')
      .should('contain.text', article.body);
  });

  it('should provide the ability to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(
      article.title, 
      article.description, 
      article.body
    ).then ((response) => {
      const slug = response.body.article.slug;

      cy.visit(`/article/${slug}`);
      cy.contains('.btn', 'Delete Article')
        .eq(0)
        .click();

      cy.contains('.nav-link', 'Global Feed')
        .should('be.visible');
      cy.get('.article-preview')
        .should('contain.text', 'No articles are here... yet.');
      });
  });
});
