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

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder='${placeholder}']`);
});

Cypress.Commands.add('loginConduit',
  (email = 'loginlog@com.com', password = 'Qwerty!23') => {
    cy.request('POST', 'https://conduit.mate.academy/api/users/login', {
      user: {
        email,
        password
      }
    }).then((response) => {
      const user = {
        bio: response.body.user.bio,
        email: response.body.user.email,
        image: response.body.user.image,
        token: response.body.user.token,
        username: response.body.user.username
      };
      window.localStorage.setItem('user', JSON.stringify(user));
      cy.setCookie('auth', response.body.user.token);
    });
    cy.visit('/');
  });
