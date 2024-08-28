// cypress/support/commands.js

Cypress.Commands.add('register', (username, email, password) => {
  return cy.request({
    method: 'POST',
    url: '/api/users',
    body: {
      user: { username, email, password }
    },
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 200) {
      const { user } = response.body;
      window.localStorage.setItem('jwtToken', user.token);
      return cy.setCookie('auth', user.token).then(() => response);
    } else {
      cy.log(`Registration failed with status ${response.status}`);
      cy.log(JSON.stringify(response.body));
      return cy.wrap(response);
    }
  });
});

Cypress.Commands.add('login', (email, password) => {
  return cy.request({
    method: 'POST',
    url: '/api/users/login',
    body: {
      user: { email, password }
    },
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 200) {
      const { user } = response.body;
      window.localStorage.setItem('jwtToken', user.token);
      return cy.setCookie('auth', user.token).then(() => response);
    } else {
      cy.log(`Login failed with status ${response.status}`);
      cy.log(JSON.stringify(response.body));
      return cy.wrap(response);
    }
  });
});

Cypress.Commands.add('createArticle', (title, description, body) => {
  return cy.getCookie('auth').then((cookie) => {
    const token = cookie.value;
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
        Authorization: `Token ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.article).to.have.property('slug');
      return cy.wrap(response.body.article);
    });
  });
});

Cypress.Commands.add('deleteArticle', (slug) => {
  return cy.getCookie('auth').then((cookie) => {
    const token = cookie.value;
    return cy.request({
      method: 'DELETE',
      url: `/api/articles/${slug}`,
      headers: {
        Authorization: `Token ${token}`
      },
      failOnStatusCode: false
    }).then((response) => {
      return cy.wrap(response);
    });
  });
});
