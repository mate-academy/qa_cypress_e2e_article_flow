describe('Article', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.visit('');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });
  });

  it('should provide user to create an article', () => {
    cy.loginAuth(user.email, user.username, user.password);
    //  check that the user is logged in:
    cy.ensureLog(user);

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
      .should('contain', article.title);

    cy.get('.col-md-12')
      .should('contain', article.body);

    cy.get('.tag-default')
      .should('contain', article.tagList);
  });

  it('should provide user to delete article', () => {
    cy.loginAuth(user.email, user.username, user.password);

    //  cy.visit('');
    //  cy.get('.navbar')
    //  .should('contain', user.username);
    cy.ensureLog(user);

    cy.createArticle(article.title, article.description,
      article.body, article.tagList)
      .then((response) => {
        const slug = response.body.article.slug; // intercept
        cy.visit('article/' + slug);
      });

    cy.get('h1')
      .should('contain', article.title);

    cy.get('.col-md-12')
      .contains(article.body);

    cy.get('.author')
      .should('contain', user.username);

    cy.get('.btn-outline-danger')
      .contains('Delete Article')
      .click();

    cy.visit('profile/' + user.username);

    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
