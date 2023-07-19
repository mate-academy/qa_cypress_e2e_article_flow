/* eslint-disable cypress/no-force */
/* eslint-disable max-len */
describe('Article flow', () => {
  let article;

  beforeEach(() => {
    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });
  });

  it('should allow to create an article', () => {
    cy.login();
    cy.get('[href="/editor"]').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tags);
    cy.contains('button', 'Publish Article').click({ force: true });
    cy.url().should('contain', '/article');
  });

  it.only('should allow to delete an article', () => {
    cy.login();
    cy.createArticle(article.title, article.description, article.body, article.tags).then((response) => {
      const slug = response.body.article.slug;
      cy.visit(`article/${slug}`);
      cy.contains('button', 'Delete Article').click();
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Do you really want to delete it?');
        cy.get('window:alert').eq(0).click();
        cy.contains('a', 'Your Feed').should('be.visible');
        cy.get('.article-preview').should('contain.text', 'No articles are here... yet.');
      });
    });
  });
});
