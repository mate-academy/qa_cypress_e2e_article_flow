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

Cypress.Commands.add('register', (user) => {
  cy.request('POST', '/api/users', {
    user: {
      email: user.email,
      username: user.username,
      password: user.password
    }
  });
});

Cypress.Commands.add('login', (user) => {
  cy.request('POST', '/api/users/login', {
    user: {
      email: user.email,
      username: user.username,
      password: user.password
    }
  }).then((response) => {
    const user = {
      bio: response.body.user.bio,
      // eslint-disable-next-line max-len
      effectiveImage: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username,
      password: response.body.user.password
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('auth', response.body.user.token);
  });
});

Cypress.Commands.add('createArticle', () => {
  cy.getCookie('auth').then((token) => {
    const authToken = token.value;
    const article = {
      title: 'a',
      description: 'a',
      body: 'a'
    };
    cy.request({
      method: 'POST',
      url: '/api/articles',
      body: {
        article: {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: []
        }
      },
      headers: {
        Authorization: `Token ${authToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const articleInfo = {
        slug: response.body.article.slug
      };
      return articleInfo;
    });
  });
});

Cypress.Commands.add('deleteArticle', (article) => {
  cy.getCookie('auth').then((token) => {
    const authToken = token.value;
    cy.request({
      method: 'DELETE',
      url: `/api/articles/${article.slug}`,
      headers: {
        Authorization: `Token ${authToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});