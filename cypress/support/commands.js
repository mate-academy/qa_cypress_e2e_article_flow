// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/* eslint-disable */
Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder='${placeholder}']`);
});

Cypress.Commands.add(
  'loginConduit',
  (email = 'panterasuper@qa.team', password = 'superpantera135$') => {
    cy.request('POST', '/api/users/login', {
      user: {
        email,
        password
      }
    }).then((response) => {
      window.localStorage.setItem('user', JSON.stringify(response.body.user));
      cy.setCookie('auth', response.body.user.token);
    });
    cy.visit('/');
  }
);
