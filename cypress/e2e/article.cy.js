describe('Conduit', () => {
  let user;
  beforeEach(() => {
    cy.visit('');
    cy.task('generateUser').then((generateUser) => {
      cy.log(generateUser);
      user = generateUser;
    });
    cy.log(user);
  });

  it('Create article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('');
    cy.get('.ion-compose').click();
    cy.findByPlaceholder('Article Title').type('Test');
    cy.findByPlaceholder("What's").type('Test1234');
    cy.findByPlaceholder('Write').type('Test about test');
    cy.findByPlaceholder('Enter').type(`Test666{enter}`);
    cy.get('[type="button"]').click();
    cy.visit('');
    cy.get('.nav > :nth-child(2) > .link').click();
    cy.get(':nth-child(2) > .preview-link > h1').should('be.visible');
  });

  it('Delete test', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('');
    cy.createArticle(
      user.articleTitle,
      user.articleDescription,
      user.articleBody
    );
    cy.contains('.nav-link', user.username.toLowerCase()).click();
    cy.contains('h1', user.articleTitle).click();
    cy.contains('.btn', 'Delete Article').click();
    cy.get('.article-preview').should(
      'contain',
      'No articles are here... yet.'
    );
  });
});
