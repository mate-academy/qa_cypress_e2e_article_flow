describe('', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  it('should be create New Article', () => {
    cy.login(user.username, user.email, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?').type(article.body);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.description);
    cy.get('.btn').contains('Publish').click();
    cy.get('h1').should('contain', article.title);
    cy.get('.row.article-content').should('contain', article.description);
  });

  it.only('should be Delete Article', () => {
    cy.login(user.username, user.email, user.password);
    cy.createArticle(article.title, article.body, article.description)
      .then((response => {
        cy.visit(`/article/${response.body.article.slug}`);
      }));
    cy.get('.btn').contains(' Delete Article').click();
    cy.get('.link').contains('Global Feed').click();
    cy.get('.row').should('not.contain', article.title);
    cy.get('.row').should('not.contain', article.description);
  });
});
