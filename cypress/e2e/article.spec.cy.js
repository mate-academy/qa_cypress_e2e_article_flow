/// <reference types='cypress' />

let email;
let password;

function loginUser() {
  cy.visit('/');
  cy.get(`a[href='/user/login']`)
    .click();
  cy.get(`input[type='email']`)
    .type(email);
  cy.get(`input[type='password']`)
    .type(password);
  cy.get(`button[type='submit']`)
    .click();
}

describe('User', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const aTitle = 'Test Title';
  const aAbout = 'Test About';
  const aText = 'Test Article';
  const aTag = 'Test';

  let profileLink;

  it(`should be able to register`, () => {
    cy.task('generateUser').then((user) => {
      cy.get(`a[href='/user/register']`)
        .click();
      cy.get(`input[type='text']`)
        .type(user.username);
      cy.get(`input[type='email']`)
        .type(user.email);
      cy.get(`input[type='password']`)
        .type(user.password);
      cy.get(`button[type='submit']`)
        .click();

      profileLink = '/profile/' + user.username.toLowerCase();
      email = user.email;
      password = user.password;

      cy.get(`a[href='${profileLink}']`)
        .should('exist');
    });
  });

  it('should be able to create article', () => {
    loginUser();

    cy.get(`a[href='/editor']`)
      .click();
    cy.get(`input[placeholder='Article Title']`)
      .type(aTitle);
    cy.get(`input[placeholder="What's this article about?"]`)
      .type(aAbout);
    cy.get(`textarea[placeholder='Write your article (in markdown)']`)
      .type(aText);
    cy.get(`input[placeholder='Enter tags']`)
      .type(aTag);
    cy.get(`button[type='button']`)
      .click();
    cy.get(`button[type='button']`)
      .click();

    cy.get(`a[href='${profileLink}']`)
      .click();
    cy.get(`h1`).contains(aTitle)
      .should('exist');
  });

  it('should be able to delete article', () => {
    loginUser();

    cy.get(`a[href='${profileLink}']`)
      .click();
    cy.get(`h1`).contains(aTitle)
      .should('exist')
      .click();
    cy.get(`button`)
      .eq(1)
      .click();

    cy.visit('/');

    cy.get(`a[href='${profileLink}']`)
      .eq(0)
      .click();
    cy.get(`div`)
      .contains('No articles are here... yet.')
      .should('exist');
  });
});
