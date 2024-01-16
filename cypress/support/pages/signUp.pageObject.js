import { PageObject } from '../PageObject';

export class SignUpPageObject extends PageObject {
  url = '/user/register';

  get usernameField() {
    return cy.findByPlaceholder('Username');
  };

  get emailField() {
    return cy.findByPlaceholder('Email');
  };

  get passwordField() {
    return cy.findByPlaceholder('Password');
  };

  get signUpButton() {
    return cy.get('.btn');
  };

  clickSignUpButton() {
    this.signUpButton.click();
  }
};
