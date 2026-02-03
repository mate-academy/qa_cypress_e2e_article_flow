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

Cypress.Commands.add('login', (email, password) => {
  cy.visit('#/login');

  cy.get('input[type="email"]')
    .type(email);

  cy.get('input[type="password"]')
    .type(password);

  cy.contains('button', 'Sign in')
    .click();
});

Cypress.Commands.add('createArticle', (article) => {
  cy.contains('a', 'New Article')
    .click();

  cy.get('input[placeholder="Article Title"]')
    .type(article.title);

  cy.get('input[placeholder="What\'s this article about?"]')
    .type(article.description);

  cy.get('textarea[placeholder="Write your article (in markdown)"]')
    .type(article.body);

  cy.get('input[placeholder="Enter tags"]')
    .type(article.tag)
    .type('{enter}');

  cy.contains('button', 'Publish Article')
    .click();
});
