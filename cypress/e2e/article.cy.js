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

  it('should allow to create article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title').type(article.tittle);
    cy.findByPlaceholder(`What's this article about?`).type(article.about);
    cy.findByPlaceholder('Write your article (in markdown)', 'textarea')
      .type(article.body);
    cy.get('.btn').contains('Publish Article').click();
    cy.get('h1').should('contain', article.tittle);
  });

  it('should allow to delete article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.tittle, article.about, article.body);
    cy.get('@article').then((article) => {
      cy.visit(`/article/${article.slug}`);
      cy.get('.btn').contains('Delete').click();
    });
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you really want to delete it?');
      return true;
    });
    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
