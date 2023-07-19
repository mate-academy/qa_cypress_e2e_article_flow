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
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('loginConduit', (email = 'testciu@gmail.com',
  password = 'testciu') => {
  cy.request({
    method: 'POST',
    url: 'https://conduit.mate.academy/api/users/login',
    body: {
      user: {
        email,
        password
      }
    }
  }).then((response) => {
    const userconduit = {
      bio: response.body.user.bio,
      effectiveImage:
      'https://static.productionready.io/images/smiley-cyrus.jpg',
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username
    };
    window.localStorage.setItem('user', JSON.stringify(userconduit));
    window.localStorage.setItem('jwt', userconduit.token);
    cy.setCookie('auth', userconduit.token);
  });
  cy.visit('/');
});

Cypress.Commands.add('createArticle', (article) => {
  cy.getCookie('auth').then((token) => {
    const authToken = token.value;

    cy.request({
      method: 'POST',
      url: 'https://conduit.mate.academy/api/articles',
      body: {
        article: {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: [article.tag]
        }
      },
      headers: {
        Authorization: `Token ${authToken}`
      }
    });
  });
});
