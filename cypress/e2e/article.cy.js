describe('Article flow', () => {
  let article;

  beforeEach(() => {
    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });
    cy.loginConduit();
  });

  it('should allow to create an article', () => {
    cy.get('[href="/editor"]').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.get(':nth-child(2) > .form-control').type(article.description); // What\'s - doesnt't work
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    cy.contains('button', 'Publish Article').click();

    cy.contains('h1', article.title).should('be.visible');
    cy.contains('div > p', article.body).should('be.visible');
    cy.contains('li', article.tag).should('be.visible');
    cy.url().should('include', '/article');
  });

  it('should allow to delete an article', () => {
    cy.get('[href="/editor"]').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.get(':nth-child(2) > .form-control').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    cy.contains('button', 'Publish Article').click();
    cy.contains('button', ' Delete Article').click();

    cy.url().should('include', 'https://conduit.mate.academy/');
    cy.contains('a', 'Your Feed').should('be.visible');
    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
