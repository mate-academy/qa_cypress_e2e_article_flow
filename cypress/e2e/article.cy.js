describe('Conduit', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
   });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.visit('/');
  });

  it('user can create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findPlaceholder('Article').type (article.title);
    cy.findPlaceholder('What\'s').type (article.description);
    cy.findPlaceholder('Write').type (article.body);
    cy.get('.btn').click();
    cy.contains('h1', article.title).should('be.visible');
  });

  it('user can delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
    .then ((response) => {
      let slug = response.body.article.slug;
    cy.visit(`/article/${slug}`);
    });
    cy.contains('.btn', 'Delete Article').click();
    cy.contains('.nav-link', 'Global Feed').click();
    cy.get('.col-md-9').should('not.contain', article.title);
    

  });
});
