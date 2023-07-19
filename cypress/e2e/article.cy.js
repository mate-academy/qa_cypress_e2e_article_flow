describe('Article flow', () => {
  let article;
  beforeEach(() => {
  cy.task('generateArticle').then((generateArticle) => {
  article = generateArticle;
  });
  cy.login();
  cy.get(':nth-child(4) > .nav-link').should('contain', 'dmytrodmytro');
  });

  it('should create the article', () => {
    cy.get('.container > .nav > :nth-child(2) > .nav-link').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.get(':nth-child(2) > .form-control').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    cy.get('.btn').click({force: true});
    cy.get('h1').should('contain', article.title);
    cy.get('div > p').should('contain', article.body);
    cy.get('.tag-default').should('contain', article.tag)
  });

  it('Should delete the article', () => {
    cy.get('.container > .nav > :nth-child(2) > .nav-link').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.get(':nth-child(2) > .form-control').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    cy.get('.btn').click({force: true});
    cy.get('h1').should('contain', article.title);
    cy.get('div > p').should('contain', article.body);
    cy.get('.tag-default').should('contain', article.tag)
    cy.contains('button', 'Delete Article').click();
    cy.get('.article-preview').should('contain', 'No articles are here... yet.')
  });
});
