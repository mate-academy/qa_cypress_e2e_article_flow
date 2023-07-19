describe('Article flow', () => {
  let article;

  beforeEach(() => {
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.loginConduit();
  });

  it('should allow to crate an article', () => {
    cy.get('[href="/editor"]').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
    .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
    .type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    cy.contains('button', 'Publish Article').click({ force: true });
    cy.contains('h1', article.title).should('be.visible');
    cy.url().should('include', 'article');
  });

  it('should allow to delete an article', () => {
    cy.createArticle(article.title,
      article.description,
      article.body,
      article.tag).then((response) => {
      const slug = response.body.article.slug;
      cy.visit(`/article/${slug}`);
    });
    cy.contains('button', 'Delete Article').click();
    cy.contains('a', 'Your Feed').should('be.visible');
    cy.get('.article-preview')
    .should('contain.text', 'No articles are here... yet.');
  });
});
