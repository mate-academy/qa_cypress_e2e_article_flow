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

const imgUrl =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

Cypress.Commands.add('login', (email, username, password) => {
  return cy.request('POST', '/api/users', {
    user: {
      email,
      username,
      password
    }
  }).then((response) => {
    const token = response.body.user.token;

    return cy.request({
      method: 'PUT',
      url: '/api/user',
      headers: {
        Authorization: `Token ${token}`
      },
      body: {
        user: {
          image: imgUrl
        }
      }
    }).then(() => {
      const user = {
        bio: response.body.user.bio,
        effectiveImage: imgUrl,
        email: response.body.user.email,
        image: imgUrl,
        token,
        username: response.body.user.username
      };

      window.localStorage.setItem('user', JSON.stringify(user));

      return cy.setCookie('auth', token).then(() => response);
    });
  });
});

Cypress.Commands.add('createArticle', (title, description, body) => {
  return cy.getCookie('auth').then((token) => {
    const authToken = token.value;

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
        Authorization: `Token ${authToken}`
      }
    });
  });
});
