describe('Article flow', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit(`/#profile/${user.username}`);
    cy.contains('.nav-link', 'New Article').click();
    cy.findPh('Article Title').type(article.title);
    cy.findPh('What\'s this article about?').type(article.description);
    cy.findPh('Write your article (in markdown)').type(article.body);
    cy.contains('.btn', 'Publish Article').click();
    cy.contains('a', user.username).click();
    cy.get('h1').should('contain', article.title);
  });

  it('should delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);
    cy.visit(`/#profile/${user.username}`);
    cy.contains('a', user.username).click();
    cy.get('h1').should('contain', article.title).click();
    cy.contains('.btn', ' Delete Article').click({ multiple: true });
    cy.get('.article-preview').should('contain', 'No articles are here... yet.');
  });
});
