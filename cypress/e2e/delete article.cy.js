describe('Conduit article', () => {
  let article = {};
  let user = {};
  before(() => {
    cy.visit('https://conduit.mate.academy/');
    cy.task('generateUser').then((newUser) => {
      user = newUser;
    });
    cy.task('generateArticle').then((newArticle) => {
      article = newArticle;
    });
  });

  it.only('delete article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);
    cy.visit('profile/' + (user.username).toLowerCase());
    cy.get('h1').click();
    cy.get('button').contains('Delete Article').click();
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
