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

const imgUrl = 'https://static.productionready.io/images/smiley-cyrus.jpg';

Cypress.Commands.add('login', (email, username, password) => {
  return cy.request('POST', '/api/users', {
    user: { email, username, password }
  }).then((response) => {
    const user = {
      bio: response.body.user.bio,
      effectiveImage: imgUrl,
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username
    };

    cy.window().then((win) => {
      win.localStorage.setItem('user', JSON.stringify(user));
    });

    cy.setCookie('auth', response.body.user.token);

    return cy.wrap(user);
  });
});

Cypress.Commands.add('createArticle', (title, description, body) => {
  return cy.getCookie('auth', { timeout: 10000 })
    .should('exist')
    .then((token) => {
      return cy.request({
        method: 'POST',
        url: '/api/articles',
        body: {
          article: {
            title,
            description,
            body,
            tagList: []
          }
        },
        headers: {
          Authorization: `Token ${token.value}`
        }
      });
    });
});
