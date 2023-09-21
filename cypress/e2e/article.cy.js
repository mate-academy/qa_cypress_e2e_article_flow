/// <reference types='cypress' />

describe('Article ', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
        user = generateUser;
      });

    cy.task('generateNewArticle')
      .then((generateNewArticle) => {
        article = generateNewArticle;
      });
  });

  it('should be create via New article form', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder = "Article Title"]').type(article.title)
    cy.get('[placeholder = "What\'s this article about?"]').type(article.description)
    cy.get('[placeholder = "Write your article (in markdown)"]').type(article.body)
    cy.get('.btn').contains('Publish').click()
  });

  it('Delete the article', () => {
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
    cy.get('.article-preview').should('contain', 'No articles are here... yet.');
  });
});