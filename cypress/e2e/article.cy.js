describe('conduit article flow', () => {
  let user;
  let article;

  before(() => {
    cy.task('newUser').then((newUser) => {
      user = newUser;
    });

    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });
  });

  it('should create a new article', () => {
    cy.login(user.email, user.username, user.password);

    cy.visit('/editor');

    cy.findByPlaceholder('Article Title')
      .type(article.title);

    cy.get(':nth-child(2) > .form-control')
      .type(article.description);
    // getting error when trying to find by placeholder,
    // so I was forced to use inbuilt cypress option

    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);

    cy.findByPlaceholder('Enter tags')
      .type(`${article.tags}{enter}`);

    cy.get('.btn').click();

    cy.get('h1')
      .should('contain.text', article.title);
  });

  it('should delete an article', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(
      article.title,
      article.description,
      article.body,
      article.tags
    ).then(
      (response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
      }
    );

    cy.get('.btn')
      .contains('Delete Article')
      .click();

    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
