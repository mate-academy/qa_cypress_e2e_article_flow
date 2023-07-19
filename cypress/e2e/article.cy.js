describe('Article flow', () => {
  let article;

  beforeEach(() => {
    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });

    cy.login();
  });

  it('should allow to create an article', () => {
    cy.get('[href="/editor"]').click();

    cy.findByPlaceholder('Article Title').type(article.title);

    // eslint-disable-next-line max-len
    cy.findByPlaceholder('What\'s this article about?').type(article.description);

    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);

    cy.findByPlaceholder('Enter tags').type(article.tag);

    // eslint-disable-next-line cypress/no-force
    cy.contains('button', 'Publish Article').click({ force: true });

    cy.contains('h1', article.title).should('be.visible');

    cy.url().should('include', 'article');
  });

  it('should allow to delete the article', () => {
    cy.get('[href="/editor"]').click();

    cy.findByPlaceholder('Article Title').type(article.title);

    // eslint-disable-next-line max-len
    cy.findByPlaceholder('What\'s this article about?').type(article.description);

    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);

    cy.findByPlaceholder('Enter tags').type(article.tag);

    // eslint-disable-next-line cypress/no-force
    cy.contains('button', 'Publish Article').click({ force: true });

    cy.contains('button', 'Delete Article').click();

    cy.contains('.nav-link', 'Your Feed').should('be.visible');

    // eslint-disable-next-line max-len
    cy.get('.article-preview').should('contain.text', 'No articles are here... yet.');
  });
});
