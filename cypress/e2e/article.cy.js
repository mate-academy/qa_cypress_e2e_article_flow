describe('Article flow', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should allow to create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tagList);
    // eslint-disable-next-line cypress/no-force
    cy.contains('button', 'Publish Article').click({ force: true });
    cy.get('h1').should('contain', article.title);
    cy.get('div > p').should('contain', article.body);
    cy.get('.tag-default').should('contain', article.tagList);
    cy.contains('button', 'Delete Article').click();
  });

  it('should allow to delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
      });
    cy.contains('button', 'Delete Article').click();
  });
});
