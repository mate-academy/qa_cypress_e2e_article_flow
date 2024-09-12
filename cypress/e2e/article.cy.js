describe('Article page', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should allow the user to create an article', () => {
    cy.visit('/');
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(`#${article.tags}{enter}`);
    cy.contains('[type="button"]', 'Publish Article').click();
    cy.get('.container > .article-meta > .info > .author').click();
    cy.get('h1').should('contain', article.title);
    cy.get('.preview-link > p').should('contain', article.description);
    cy.get('.tag-default').should('contain', article.tags);
  });

  it.only('should allow the user to delete an article', () => {
    cy.visit('/');
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);
    cy.get('.nav-link').contains('Home').click();
    cy.get('.nav-link').contains(user.username.toLowerCase()).click();
    cy.get('h1').should('contain', article.title);
    cy.get('.preview-link > p').should('contain', article.description);
    cy.get('h1').click();
    cy.get('.btn').contains('Delete Article').click();
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal(`Do you really want to delete it?`);
    });

    cy.on('window:confirm', () => true);
    cy.get('.article-preview').should('contain', 'No articles are here... yet');
  });
});
