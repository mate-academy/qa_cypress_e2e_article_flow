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

  it('should provide the ability to create an article', () => {
    cy.login(
      user.email,
      user.username,
      user.password
    );

    cy.reload();

    cy.contains('.nav-link', 'New Article').click();

    cy.getByPlaceholder('Article Title').type(article.title);
    cy.getByPlaceholder('What\'s this').type(article.description);
    cy.getByPlaceholder('Write your').type(article.body);

    cy.contains('button', 'Publish Article').click();

    cy.get('h1').should('contain', article.title);
    cy.get('.col-md-12').should('contain', article.body);
  });

  it('should provide the abiity to delete an article', () => {
    cy.login(
      user.email,
      user.username,
      user.password
    );

    cy.reload();

    cy.createArticle(
      article.title,
      article.description,
      article.body
    );

    cy.reload();

    cy.contains('a', 'Global Feed').click();
    cy.contains('h1', article.title).click();
    cy.contains('button', ' Delete Article')
      .eq(0)
      .click();

    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});