describe('Article Flow', () => {
  let article;

  beforeEach(() => {
    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });

    cy.login();
    cy.visit('/');
  });

  it('should allow to create an article', () => {
    cy.contains('a', 'New Article')
      .click();
    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.findByPlaceholder('Enter tags')
      .type(article.tag);
    cy.contains('button', 'Publish Article')
      .click({ force: true });

    cy.url()
      .should('include', '/article');
    cy.get('h1')
      .should('contain', article.title);
  });

  it('should allow to delete an article', () => {
    let slug;

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        slug = response.body.article.slug;

        cy.visit(`article/${slug}`);
      });

    cy.contains('button', 'Delete Article').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you really want to delete it?');
    });

    cy.get('.nav-link.active')
      .should('contain', 'Your Feed');
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
