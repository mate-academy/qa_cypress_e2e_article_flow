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

const faker = require("faker");

Cypress.Commands.add("findByPlaceholder", (placeholder) => {
  cy.get(`[placeholder^="${placeholder}"]`);
});

Cypress.Commands.add('login', (email, password, username) => {
  cy.request('POST', '/api/users', {
    user: {
      email: email,
      password: password,
      username: username
    }
  }).then(response => {
    const user = {
      bio: response.body.user.bio,
      effectiveImage: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('auth', response.body.user.token);
  });
});

Cypress.Commands.add('createArticle', (title, description, body) => {
  cy.request('POST', '/users', {
    email:faker.internet.email(),
    username: faker.name.firstName(),
    password: 'Qwer1232'
  }).then(response => {
    cy.setCookie('drash_sess', response.body.user.token);
  })
  
  cy.getCookie('auth').then((token) => {
    const authToken = token.value;

    cy.request('POST', '/api/articles', {
      body: {
        article: {
          title: title,
          description: description,
          body: body,
          tagList: [],
          }
        },
      headers: {
        Authorization: `Token ${authToken}`
      },
    })
  });
});
