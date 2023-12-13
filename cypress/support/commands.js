// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.

// const { describe } = require('mocha');

// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
  Cypress.log({
    email: 'login',
    message: `${email} | ${password}`
  });
  cy.get(':nth-child(1) > .form-control')
    .type(email);
  cy.get(':nth-child(2) > .form-control')
    .type(password);
  cy.get('.btn')
    .click();
});

// Cypress.Commands.add('article', (title, description, contents, tagi) => {
//   Cypress.log({
//     title: 'article',
//     message: `${title} | ${description} | ${contents} | ${tagi}`
//   });
//   cy.get(':nth-child(1) > .form-control')
//     .type(title);
//   cy.get(':nth-child(2) > .form-control')
//     .type(description);
//   cy.get(':nth-child(3) > .form-control')
//     .type(contents);
//   cy.get(':nth-child(4) > .form-control')
//     .type(tagi);
//   cy.get('.btn')
//     .click();
// });
