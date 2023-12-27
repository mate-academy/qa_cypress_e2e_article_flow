describe('Article flow', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('Should create new article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder(`What's this article about?`).type(
      article.description
    );
    cy.findByPlaceholder('Write your article (in markdown)', 'textarea').type(
      article.body
    );
    cy.get('button').contains('Publish').click();
    cy.url().should('contain', 'article');
    cy.get('h1').should('contain', article.title);
  });

  it('Should delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);
    cy.get('@article').then((article) => {
      cy.visit(`/article/${article.slug}`);
      cy.get('button').contains('Delete').click();
    });
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you really want to delete it?');
      return true;
    });

    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
