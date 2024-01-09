import { SignUpPageObject } from '../support/SignUp.pageObject';

describe('Sign-Up Test', () => {
  const signUpPage = new SignUpPageObject();
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should sign up a new user', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    cy.get('.btn').contains('Sign up').should('be.visible').click();

    signUpPage.assertUrlNotInclude('/register');
  });
});
