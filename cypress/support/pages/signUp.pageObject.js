import PageObject from './pageObject.js';
import { ArgumentError } from '../customComands.js';

class SignUpPageObject extends PageObject {
  url = '/user/register';

  get usernameField() {
    return cy.get('form input[placeholder^="Username"]');
  }

  get emailField() {
    return cy.get('form input[placeholder^="Email"]');
  }

  get passwordField() {
    return cy.get('form input[placeholder^="Password"]');
  }

  get signUpButton() {
    return cy.get('form button').contains('Sign up');
  }

  fillUsername(username) {
    this.usernameField.click();
    this.usernameField.clear();
    this.usernameField.type(username);
  }

  fillEmail(email) {
    this.emailField.click();
    this.emailField.clear();
    this.emailField.type(email);
  }

  fillPassword(password) {
    this.passwordField.click();
    this.passwordField.clear();
    this.passwordField.type(password);
  }

  clickOnSignUpButton() {
    this.signUpButton.should((signUpBtn) => {
      expect(signUpBtn).not.to.have.attr('disabled');
    }).click();
  }

  addToUsername(text) {
    this.usernameField.click();
    this.usernameField.type();
  }

  /**
   *
   * @param {string} username
   * @param {string} email
   * @param {string} password
   */
  registerViaAPI(
    username, email, password, useDefaultInternalValidation = true) {
    if (arguments.length < 3) {
      throw new ArgumentError(`Method "registerViaAPI" requires at least 3 argument`);
    } else if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof useDefaultInternalValidation !== 'boolean'
    ) {
      throw new ArgumentError('Method "registerViaAPI" requires only' +
        'String arguments (excluding: the "useDefaultInternalValidation" arg ' +
        ', which must be Boolean');
    }

    const isValidUsername = /^\p{Letter}{3,40}$/ug.test(username);
    const isValidEmail = /^\w+([-.+']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
    const isValidPassword =
      /\p{Lu}+/u.test(password) &&
      /\d+/.test(password) &&
      /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/.test(password) &&
      password.length > 3 &&
      password.length < 41;

    switch (true) {
      case !isValidUsername && useDefaultInternalValidation:
        throw new ArgumentError('"username" must have 3-40 letters');
      case !isValidEmail && useDefaultInternalValidation:
        throw new ArgumentError('"email" has probably incorrect structure');
      case !isValidPassword && useDefaultInternalValidation:
        throw new ArgumentError('"password" must consist of at least; ' +
          '1 uppercase, 1 digit, 1 special character and must have from ' +
          '3 to 40 characters'
        );
    }

    cy.register(email, username, password);
  }

  /**
   *
   * @param {string} username
   * @param {string} email
   * @param {string} password
   */
  registerViaGUI(
    username, email, password, useDefaultInternalValidation = true) {
    if (arguments.length < 3) {
      throw new ArgumentError(`Method "registerViaGUI" requires at least 3 arguments`);
    } else if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof useDefaultInternalValidation !== 'boolean'
    ) {
      throw new ArgumentError('Method "registerViaGUI" requires only ' +
        'String arguments (excluding: the "useDefaultInternalValidation" arg ' +
        ', which must be Boolean');
    }

    const isValidUsername = /^\p{Letter}{3,40}$/ug.test(username);
    const isValidEmail = /^\w+([-.+']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
    const isValidPassword =
      /\p{Lu}+/u.test(password) &&
      /\d+/.test(password) &&
      /[ !"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]+/.test(password) &&
      password.length > 3 &&
      password.length < 41;

    switch (true) {
      case !isValidUsername && useDefaultInternalValidation:
        throw new ArgumentError('"username" must have 3-40 letters');
      case !isValidEmail && useDefaultInternalValidation:
        throw new ArgumentError('"email" has probably incorrect structure');
      case !isValidPassword && useDefaultInternalValidation:
        throw new ArgumentError('"password" must consist of at least; ' +
          '1 uppercase, 1 digit, 1 special character and must have from ' +
          '3 to 40 characters'
        );
    }
    this.fillUsername(username);
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickOnSignUpButton();
  }
}

export default SignUpPageObject;
