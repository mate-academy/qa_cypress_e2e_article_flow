/// <reference types='cypress' />

describe('User', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  let username;
  let email;
  let password;

  it(`should be able to register`, () => {
    cy.task('generateUser').then((user) => {
      username = user.username;
      email = user.email;
      password = user.password;

      cy.get(`a[href='/user/register']`)
        .click();
      cy.get(`input[type='text']`)
        .type(username);
      cy.get(`input[type='email']`)
        .type(email);
      cy.get(`input[type='password']`)
        .type(password);
      cy.get(`button[type='submit']`)
        .click();
    });
  });

  it('should be able to create article', () => {
    cy.get(`a[href='/user/login']`)
      .click();
    cy.get(`input[type='email']`)
      .type(email);
    cy.get(`input[type='password']`)
      .type(password);
    cy.get(`button[type='submit']`)
      .click();

    cy.get(`a[href='/editor']`)
      .click();
    cy.get(`input[placeholder='Article Title']`)
      .type('Test Title');
    cy.get(`input[placeholder="What's this article about?"]`)
      .type('Test About');
    cy.get(`textarea[placeholder='Write your article (in markdown)']`)
      .type('Test Article');
    cy.get(`input[placeholder='Enter tags']`)
      .type('Test');
    cy.get(`button[type='button']`)
      .click();
    cy.get(`button[type='button']`)
      .click();

    cy.get(`a[href='/profile/${username.toLowerCase()}']`)
      .click();
    cy.get(`h1`).contains('Test Title')
      .should('exist');
  });

  it('should be able to delete article', () => {
    cy.get(`a[href='/user/login']`)
      .click();
    cy.get(`input[type='email']`)
      .type(email);
    cy.get(`input[type='password']`)
      .type(password);
    cy.get(`button[type='submit']`)
      .click();

    cy.get(`a[href='/profile/${username.toLowerCase()}']`)
      .click();
    cy.get(`h1`).contains('Test Title')
      .should('exist')
      .click();
    cy.get(`button`)
      .eq(1)
      .click();

    cy.visit('/');

    cy.get(`a[href='/profile/${username.toLowerCase()}']`)
      .eq(0)
      .click();
    cy.get(`div`)
      .contains('No articles are here... yet.')
      .should('exist');
  });
});
