import { SignInPageObject } from '../support/signIn.pageObject';

describe('Conduit article', () => {
  const signInPage = new SignInPageObject();
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in', () => {
    cy.login(user.email, user.username, user.password);
    signInPage.visit();

    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(user.password);
    cy.get('.btn').contains('Sign in').should('be.visible').click();
  });
});
