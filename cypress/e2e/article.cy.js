describe('', () => {
  let user;
  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('should provide an ability to create the article', () => {
    cy.register(user);
    cy.login(user);
    cy.getCookie('auth').should('exist');
    cy.visit('https://conduit.mate.academy/');
    cy.get('.container > .nav > :nth-child(2) > .nav-link').click();
    cy.findByPlaceholder('Article Title').type('aaa');
    cy.findByPlaceholder("What's this article about?").type('aaa');
    cy.findByPlaceholder('Write your article (in markdown)').type('aaa');
    cy.get('.btn').click();
    cy.get('h1').should('contain', 'aaa');
    cy.get(':nth-child(3) > .nav-link').click();
    cy.get('.btn-outline-danger').click();
  });

  it('should provide an ability to delete the article', () => {
    cy.login(user);
    cy.getCookie('auth').should('exist');
    cy.createArticle().then((articleInfo) => {
      cy.deleteArticle(articleInfo);
    });
  });
});
