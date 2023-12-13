describe('The task Article Flow', () => {
  before(() => {
    cy.visit('/');
  });
  it('Main Page', () => {
    // User is on the main Pgae
    cy.contains('Conduit')
      .should('exist');
    cy.contains('a', 'Global Feed')
      .should('exist');
    cy.contains('.sidebar p', 'Popular Tags')
      .should('exist');
    cy.get('.nav-link')
      .contains('Sign in')
      .should('be.visible');
  });
  // User is log in
  it('Successfull login', function () {
    cy.visit('/user/login');
    cy.login('cy.test@email.com', '123456789');
    cy.url()
      .should('contain', '/user/login');
    cy.get(':nth-child(4) > .nav-link');
  });
  // User created new article
  it('Created new Article', () => {
    cy.visit('/user/login');
    cy.login('cy.test@email.com', '123456789');
    cy.url()
      .should('contain', '/user/login');
    cy.get(':nth-child(4) > .nav-link')
      .should('contain.text', 'cypress_tests');
    cy.contains('a', 'Global Feed')
      .should('exist');
    cy.contains('.sidebar p', 'Popular Tags')
      .should('exist');
    cy.get('.container > .nav > :nth-child(2) > .nav-link')
      .should('exist')
      .click();
    cy.get(':nth-child(1) > .form-control')
      .type('Cypress First Time');
    cy.get(':nth-child(2) > .form-control')
      .type('How to do');
    cy.get(':nth-child(3) > .form-control')
      .type(' Bla lab bala');
    cy.get(':nth-child(4) > .form-control')
      .type('cy.');
    cy.get('.btn')
      .click();
    cy.get('.btn')
      .click();
  });
  // User deleted article
  it('Deleted Article', () => {
    cy.visit('/user/login');
    cy.login('cy.test@email.com', '123456789');
    cy.url()
      .should('contain', '/user/login');
    cy.get(':nth-child(4) > .nav-link')
      .should('contain.text', 'cypress_tests');
    cy.contains('a', 'Global Feed')
      .should('exist');
    cy.contains('.sidebar p', 'Popular Tags')
      .should('exist');
    cy.get('.container > .nav > :nth-child(2) > .nav-link')
      .should('exist')
      .click();
    cy.get(':nth-child(1) > .form-control')
      .type('Cypress First Time');
    cy.get(':nth-child(2) > .form-control')
      .type('How to do');
    cy.get(':nth-child(3) > .form-control')
      .type(' Bla lab bala');
    cy.get(':nth-child(4) > .form-control')
      .type('cy.');
    cy.get('.btn')
      .click();
    cy.get('.btn')
      .click();
    cy.get('h1')
      .should('contain.text', 'Cypress First Time');
    cy.get('.article-actions > .article-meta > .info > .author')
      .should('contains.text', 'cypress_tests');
    cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-danger')
      .should('be.visible', { timeout: 20000 })
      .click();
  });
});
