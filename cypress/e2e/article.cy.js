describe('Conduit app', () => {
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

  it('should be able to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.get('[type="button"]').contains('Publish').click();
    cy.get('.article-page').should('exist');
    cy.contains('.container', article.title).should('exist');
  });

  it('should be able to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`article/${slug}`);
      });
      cy.contains('.btn', 'Delete Article').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you really want to delete it?');
    });
    cy.get('.article-preview').should('contain', 'No articles are here');
  });
});
