// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/Login',
    body: {
      userName: username,
      password
    }
  }).then((response) => {
    cy.setCookie('token', response.body.token);
    cy.setCookie('userID', response.body.userId);
    cy.setCookie('expires', response.body.expires);
    cy.setCookie('userName', response.body.username);
  });
});
