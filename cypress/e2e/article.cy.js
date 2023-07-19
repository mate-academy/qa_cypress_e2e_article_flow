describe('Article Flow', () => {
  let article;

  beforeEach(() => {
    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });

    cy.login();
  });

  it('Should allow to create the article', () => {
    cy.get('[href="/editor"]').click();

    cy.findByPlaceholder('Article Title')
      .type(article.title);

    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);

    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);

    cy.findByPlaceholder('Enter tags')
      .type(article.tags);

    cy.contains('button', 'Publish Article')
      .click();

    cy.get('h1').should('contain', article.title);

    cy.url().should('include', 'article');
  });

  it('Should allow to delete the article', () => {
    cy.get('[href="/editor"]').click();

    cy.findByPlaceholder('Article Title')
      .type(article.title);

    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);

    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);

    cy.findByPlaceholder('Enter tags')
      .type(article.tags);

    cy.contains('button', 'Publish Article')
      .click();

    cy.get('h1').should('contain', article.title);

    cy.contains('button', 'Delete Article').click();

    cy.contains('a', 'Your Feed').should('be.visible');

    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
