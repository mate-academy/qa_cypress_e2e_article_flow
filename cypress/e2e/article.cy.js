describe('Article flow', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      cy.login(
        user.email,
        user.username,
        user.password
      );
    });
  });

  it('should create an article', () => {
    const uniqueId = Date.now();

    const article = {
      title: `Test article ${uniqueId}`,
      description: `Test description ${uniqueId}`,
      body: `Test article body ${uniqueId}`
    };

    cy.contains('a', 'New Article')
      .should('be.visible')
      .click();

    cy.get('input[placeholder="Article Title"]')
      .type(article.title);

    cy.get(
      'input[placeholder="What\'s this article about?"]'
    ).type(article.description);

    cy.get(
      'textarea[placeholder="Write your article (in markdown)"]'
    ).type(article.body);

    cy.contains('button', 'Publish Article').click();

    cy.url().should('include', '/article/');
    cy.get('h1').should('contain.text', article.title);
    cy.get('.article-content').should(
      'contain.text',
      article.body
    );
  });

  it('should delete an article', () => {
    const uniqueId = Date.now();

    const article = {
      title: `Article to delete ${uniqueId}`,
      description: `Description to delete ${uniqueId}`,
      body: `Body to delete ${uniqueId}`
    };

    cy.createArticle(
      article.title,
      article.description,
      article.body
    ).then((createdArticle) => {
      cy.visit(`/article/${createdArticle.slug}`);

      cy.get('h1').should(
        'contain.text',
        article.title
      );

      cy.contains('Delete Article')
        .first()
        .click();

      cy.url().should(
        'eq',
        Cypress.config('baseUrl')
      );
    });
  });
});
