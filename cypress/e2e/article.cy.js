describe('Article Page', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    cy.task('newArticle').then(newArticle => {
      article = newArticle;
    });
  });

  it('should provide an ability to create new article', () => {
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.contains('.btn', 'Publish Article').click();
    cy.get('h1').should('contain', article.title);
    cy.get('.col-md-12').should('contain', article.body);
});

  it('should provide an ability to delete', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then(response => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
        cy.contains('.btn', 'Delete Article').click();
        cy.get('.article-preview').should('contain', 'No articles are here... yet.');
      });
  });
});
