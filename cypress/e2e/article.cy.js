describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.visit('/');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    })
  })

  it('should provide an ability to create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');

    cy.findByPlaceHolder('Article Title').type(article.title);
    cy.findByPlaceHolder('What\'s this article about?').type(article.description);
    cy.findByPlaceHolder('Write your article (in markdown)').type(article.body);
    cy.contains('Publish Article').click();

    cy.contains('h1', article.title).should('be.visible');
    cy.url().should('include', 'article');
  });

  it('should provide an ability to delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`article/${response.body.article.slug}`);
      });
    cy.contains('.btn', 'Delete Article').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you really want to delete it?');
      return true;
    });
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
    cy.url().should('include', '/');
  });
});
