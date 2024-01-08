describe('Conduit app', () => {
  let article;

  beforeEach(() => {
    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });
    cy.login();
  });

  it('should provide an abiliti to create an article', () => {
    cy.visit('/');
    cy.get('[href="/editor"]').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tags);
    cy.get('[type="button"]').click();
    cy.get('[type="button"]').click();

    cy.url().should('contain', article.title);
  });

  it('should provide an abiliti to delete the article', () => {
    cy.visit('/');
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
      });
    cy.contains('button', 'Delete Article').click();
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal('Do you really want to delete it?');
    });
  });
});
