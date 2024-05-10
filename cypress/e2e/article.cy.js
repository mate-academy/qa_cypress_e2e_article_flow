describe('Article', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });
  });

  it('should provide user to create an article', () => {
    cy.loginAuth(user.email, user.username, user.password);

    cy.visit('/editor');
    cy.byPlaceholder('Article Title')
      .type(article.title);
    cy.byPlaceholder(`What's this article about?`)
      .type(article.description);
    cy.byPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.byPlaceholder('Enter tags')
      .type(article.tagList + '{enter}');
    cy.get('.btn')
      .click();
    cy.get('h1')
      .contains(article.title);
    cy.get('.col-md-12')
      .contains(article.body);
    cy.get('.tag-default')
      .contains(article.tagList);
  });

  it('should provide user to delete already', () => {
    cy.loginAuth(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit('article/' + slug);
      });
    cy.get('.btn-outline-danger')
      .contains('Delete Article')
      .click();

    cy.visit('profile/' + user.username);
    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
