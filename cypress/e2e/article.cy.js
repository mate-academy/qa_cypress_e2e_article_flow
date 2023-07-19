describe('Article flow', () => {
  let article;

  beforeEach(() => {
    cy.visit('/');
    cy.login('gitepi3626@vaband.com', 'pXTDbz8429');

    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });
  });

  it('Should allow to create an article', () => {
    cy.visit('/editor');

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

    cy.contains('h1', article.title)
      .should('be.visible');
    cy.url().should('include', 'article');
  });

  it('Should allow to delete an article', () => {
    cy.visit('/editor');

    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.findByPlaceholder('Enter tags')
      .type(article.tags);

    cy.contains('button', 'Publish Article').click();
    cy.contains('button', 'Delete Article').click();

    cy.contains('.nav-link', 'Your Feed').should('be.visible');
    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
