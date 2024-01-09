import { PageObject } from './PageObject';

export class SignUpPageObject extends PageObject {
  url = 'user/register';

  get usernameField() {
    return cy.findByPlaceholder('Username');
  }

  get emailField() {
    return cy.findByPlaceholder('Email');
  }

  get passwordField() {
    return cy.findByPlaceholder('Password');
  }

  // get signUpButton() {
  //   return cy.contains('[class="btn btn-lg btn-primary pull-xs-right"]'
  //     , 'Sign up').click();
  // }
};
