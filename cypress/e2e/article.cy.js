describe('Article creation and deletion', () => {
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

  it('should provide an ability to create a new article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');

    cy.findbyPlaceholder('Article Title').type(article.title);
    cy.findbyPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findbyPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.contains('Publish Article').click();

    cy.get('.banner')
      .should('contain.text', article.title);
    cy.get('.article-content')
      .should('contain', article.body);
    cy.get('.btn')
      .contains('Edit Article')
      .should('be.visible');
    cy.get('.btn')
      .contains('Delete Article')
      .should('be.visible');
  });

  it('should provide an ability to delete an article', () => {
    cy.createArticle(
      user.username,
      user.email,
      user.password,
      article.title,
      article.description,
      article.body
    ).then((response) => {
      cy.visit(`/article/${response.body.article.slug}`);
    });
    cy.get('.article-actions').contains('Delete Article').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you really want to delete it?');
      return true;
    });
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
