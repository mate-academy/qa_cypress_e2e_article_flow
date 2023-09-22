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

  it.skip('should be create via New article form', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder = "Article Title"]').type(article.title)
    cy.get('[placeholder = "What\'s this article about?"]').type(article.description)
    cy.get('[placeholder = "Write your article (in markdown)"]').type(article.body)
    cy.get('.btn').contains('Publish').click()
    cy.url().should('include', 'article');
    cy.get('h1').should('contain.text', article.title)
    cy.get('.article-content').should('contain.text', article.body)
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