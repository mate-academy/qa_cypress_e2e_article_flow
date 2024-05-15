/// <reference types='cypress' />
describe('Check article flow', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.visit('/user/login');
    cy.task('generateUser').then((userData) => {
      user = userData;
    });
    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });
  });
  it('should create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('');
    cy.createArticle(article.title, article.description, article.body);
    cy.visit('/editor');

    cy.byPlaceholder('Article Title')
      .type(article.title);

    cy.byPlaceholder(`What's this article about?`)
      .type(article.description);

    cy.byPlaceholder('Write your article (in markdown)')
      .type(article.body);

    cy.get('.btn')
      .click();

    cy.get('h1')
      .should('contain', article.title);

    cy.get('.col-md-12')
      .should('contain', article.body);

  });
  it('should provide user to delete article', () => {

    cy.login(user.email, user.username, user.password);
    cy.visit('');
    cy.createArticle(article.title, article.description,
      article.body)
      .then((response) => {
        const slug = response.body.article.slug; 
        cy.visit('article/' + slug);
      });

    cy.get('h1')
      .should('contain', article.title);

    cy.get('.col-md-12')
      .contains(article.body);

    cy.get('.btn-outline-danger')
      .contains('Delete Article')
      .click();

    cy.get('.article-preview')
    .should('contain.text', 'No articles are here... yet.');
});
});