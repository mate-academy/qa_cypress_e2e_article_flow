describe('Article flow', () => {
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      article = {
        title: `Test article ${Date.now()}`,
        description: `Test description ${Date.now()}`,
        body: `Test body ${Date.now()}`
      };

      cy.login(
        generatedUser.email,
        generatedUser.username,
        generatedUser.password
      );
    });
  });

  it('should create an article', () => {
    cy.visit('/');

    cy.contains('New Article').should('be.visible').click();
    cy.url().should('include', '/editor');

    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get('input[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type(article.body);

    cy.contains('Publish Article').click();

    cy.contains('h1', article.title).should('be.visible');
    cy.contains(article.body).should('be.visible');
  });

  it('should delete an article', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const { slug } = response.body.article;

        cy.visit(`/article/${slug}`);
        cy.url().should('include', slug);

        cy.contains('Delete Article').should('be.visible').click();

        cy.url().should('eq', 'https://conduit.mate.academy/');
      });
  });
});
