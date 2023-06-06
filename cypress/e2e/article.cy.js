
/// <reference types="cypress" />
/// <reference types='../support' />

describe('Article page', () => {
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

  it('should provide to create new article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');

    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder(`What's this article about?`)
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.findByPlaceholder('Enter tags')
      .type(article.tag);
    cy.get('.btn.btn-lg.pull-xs-right.btn-primary')
      .click({ force: true });
    cy.get('h1')
      .should('contain', article.title);
    cy.get('.col-md-12')
      .should('contain.text', article.body);
    cy.get('.tag-outline')
      .should('contain.text', article.tag);
    cy.contains('a', 'Edit Article')
      .should('exist');
    cy.contains('.btn.btn-outline-danger.btn-sm', 'Delete Article')
      .should('exist');
  });

  it('should provide to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body).then(response => {
      const slug = response.body.article.slug;
      cy.visit(`/article/${slug}`);
      cy.get('.btn.btn-outline-danger.btn-sm')
        .eq(0)
        .click();
    });
  });
});
