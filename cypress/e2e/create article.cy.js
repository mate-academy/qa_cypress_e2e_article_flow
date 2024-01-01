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

  it('create a new article', () => {
    cy.login(user.email, user.username, user.password);
    cy.reload();
    cy.get('.navbar').should('contain', user.username.toLowerCase());
    cy.createArticle(article.title, article.description, article.body);
    cy.get('a.nav-link[href="/editor"]').click();
    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get('input[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('fieldset.form-group textarea.form-control').type(article.body);
    cy.get('button.btn.btn-lg.pull-xs-right.btn-primary').click();
    cy.contains('a', user.username.toLowerCase()).click();
    cy.get('.row').should('contain', article.title);
    cy.get('.row').should('contain', article.description);
    cy.visit('profile/' + (user.username).toLowerCase());
  });
});
