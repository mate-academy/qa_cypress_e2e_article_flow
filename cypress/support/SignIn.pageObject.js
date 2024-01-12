import { PageObject } from './PageObject';

export class SignInPageObject extends PageObject {
  url = 'user/login';

  get emailField() {
    return cy.findByPlaceholder('Email');
  }

  get passwordField() {
    return cy.findByPlaceholder('Password');
  }

  // get signInButton() {
  //   return cy.contains('[class="btn btn-lg btn-primary pull-xs-right"]'
  //     , 'Sign in').click();
  // }

  // clickSignInButton() {
  //   this.signInButton.click();
  // }
};
