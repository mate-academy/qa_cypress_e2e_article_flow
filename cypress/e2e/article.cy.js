/// <reference types='cypress' />
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

  it('should create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.get('.btn').contains('Publish Article').click();
    cy.get('.container').should('contain', article.title);
    cy.get('.author').should('contain', user.username.toLowerCase());
  });

  it('should delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);
    cy.visit('/profile/' + user.username.toLowerCase());
    cy.get('.preview-link').contains(article.title).click();
    cy.get('.btn').contains('Delete Article').click();
    cy.on('window:confirm', (alertText) => {
      expect(alertText).to.equal('Do you really want to delete it?');
    });
    cy.on('window:confirm', () => true);
    cy.visit('/profile/' + user.username.toLowerCase());
    cy.get('.article-preview').should('not.contain', article.title);
  });
});
