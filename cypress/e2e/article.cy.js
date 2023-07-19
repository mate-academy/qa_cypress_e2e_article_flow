describe('Article flow', () => {
  let article;

  beforeEach(() => {
    cy.loginConduit();
    cy.task('newArticle').then((newArticle) => {
      article = newArticle;
    });
  });

  it('should allow to create a new article', () => {
    // eslint-disable-next-line cypress/no-force
    cy.get('[href="/editor"]').click({ force: true });
    cy.findByPlaceholder('Article Title').type(article.title);
    // eslint-disable-next-line max-len
    cy.findByPlaceholder('What\'s this article about?').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    // eslint-disable-next-line cypress/no-force
    cy.contains('button', 'Publish').click({ force: true });

    cy.contains('h1', article.title).should('be.visible');
    cy.contains('p', article.body).should('be.visible');
    cy.get('.tag-default').should('contain', article.tag);
    cy.url().should('include', 'article');
  });

  it('should allow to delete created article', () => {
    let slug;
    // eslint-disable-next-line max-len
    cy.createArticle(article.title, article.description, article.body, article.tag)
      .then((response) => {
        slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
      });

    cy.contains('h1', article.title).should('be.visible');
    cy.contains('p', article.body).should('be.visible');

    // eslint-disable-next-line cypress/no-force
    cy.contains('button', ' Delete Article').click({ force: true });

    cy.contains('.nav-link', 'Your Feed').should('be.visible');
    // eslint-disable-next-line max-len
    cy.get('.article-preview').should('contain.text', 'No articles are here... yet.');
  });
});
