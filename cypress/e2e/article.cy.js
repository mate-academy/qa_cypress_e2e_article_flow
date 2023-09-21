describe('Article flow', () => {
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

  it('should create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
    .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tags);
    cy.contains('button', 'Publish Article').click({ force: true });
    cy.contains('h1', article.title).should('be.visible');
    cy.url().should('include', 'article');
  });

  it('should delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
    .then((response) => {
      cy.visit(`article/${response.body.article.slug}`);
    });
    cy.contains('button', 'Delete Article').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Do you really want to delete it?');
      return true;
    });
    cy.get('.article-preview').should('contain', 'No articles are here... yet.');
    cy.url().should('include', '/');
  });
});
