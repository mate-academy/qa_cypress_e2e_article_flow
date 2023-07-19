describe('Article Flow', () => {
  let article;

  beforeEach(() => {
    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });

    cy.login();
    cy.visit('/');
  });

  it('should allow to create new article', () => {
    cy.contains('a', 'New Article').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    // eslint-disable-next-line cypress/no-force
    cy.contains('button', 'Publish Article').click({ force: true });

    cy.url().should('include', '/article');
    cy.get('h1').should('contain', article.title);
    cy.get(`p`).should('contain', article.body);
    cy.get(`li`).should('contain', article.tag);
  });

  it('should allow to delete article', () => {
    cy.contains('a', 'New Article').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    // eslint-disable-next-line cypress/no-force
    cy.contains('button', 'Publish Article').click({ force: true });
    cy.contains('button', 'Delete Article').click();
    cy.get('.nav-link.active').should('contain', 'Your Feed');
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
