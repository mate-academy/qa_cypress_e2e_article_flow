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

Cypress.Commands.add('login', (user) => {
  cy.request({
    method: 'POST',
    url: '/api/users/login',
    body: {
      user
    }
  }).then((response) => {
    const user = {
      bio: response.body.user.bio,
      effectiveImage: imgUrl,
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('auth', response.body.user.token);
  });
});

Cypress.Commands.add('createArticle', (user, article) => {
  cy.request({
    method: 'POST',
    url: '/api/users/login',
    body: {
      user: {
        email: user.email,
        password: user.password
      }
    }
  }).then((loginResponse) => {
    expect(loginResponse.status).to.eq(200);
    const authToken = loginResponse.body.user.token;
    cy.setCookie('auth', authToken);

    cy.request({
      method: 'POST',
      url: '/api/articles',
      headers: {
        Authorization: 'Token ' + authToken
      },
      body: {
        article: {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList || []
        }
      }
    }).then((articleResponse) => {
      expect(articleResponse.status).to.eq(200);

      cy.visit(`/article/${articleResponse.body.article.slug}`);
    });
  });
});
