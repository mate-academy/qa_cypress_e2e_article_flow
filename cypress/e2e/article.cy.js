/// <reference types='cypress' />
describe('Article flow', () => {
  let article;


  beforeEach(() => {
    cy.visit('/');
    cy.loginConduit();
    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });
  });

  it('should allow to create new article', () => {
    cy.visit('/editor');
    cy.contains('a', 'New Article').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('Enter tags').type(article.tags);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.contains('button', 'Publish Article').click();
    
    

    cy.contains('h1', article.title).should('be.visible'); 
    cy.url().should('include', 'article');
  });

  it('should allow to delete article', () => {
    cy.visit('/');
    cy.contains('a', 'New Article').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tags);
    cy.contains('button', 'Publish Article').click({ force: true });
    cy.contains('button', 'Delete Article').click();
    cy.get('.nav-link.active').should('contain', 'Your Feed');
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});


