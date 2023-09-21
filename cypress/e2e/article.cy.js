describe('Cypress application', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });
  it('allow to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]')
      .type(article.title);
    cy.get('[placeholder^="What\'s this"]')
      .type(article.description);
    cy.get('[placeholder^="Write your"]')
      .type(article.body);
    cy.contains('button', 'Publish Article')
      .click();
    cy.get('.article-page')
      .should('contain', article.title);
    cy.get('.article-content')
      .should('contain', article.body);
    cy.get('.btn')
      .contains('Delete Article')
      .should('be.visible');
  });

  it('allow to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`article/${response.body.article.slug}`);
      });
    cy.contains('button', 'Delete Article').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you really want to delete it?');
      return true;
    });
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
