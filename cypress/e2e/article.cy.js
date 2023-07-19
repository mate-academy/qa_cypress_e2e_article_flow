describe('New Article', () => {
  let article;
  beforeEach(() => {

    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });

    cy.login();
  });

  it('should allow to create the article', () => {
    cy.contains('a', 'New Article').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    cy.contains('button', 'Publish Article').click({ force: true });

    cy.get('h1').should('contain', article.title);
    cy.get('.col-md-12').should('contain', article.body);
    cy.get('.tag-list').should('contain', article.tag);
    cy.url().should('include', '/article');
  });

  it('should allow to delete the article', () => {
    cy.contains('a', 'New Article').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    cy.contains('button', 'Publish Article').click({ force: true });
    cy.contains('button', ' Delete Article').click();

    cy.get('.article-preview').should('contain', 'No articles are here... yet.');
    cy.url().should('include', '/');
  });
});
