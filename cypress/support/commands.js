Cypress.Commands.add('login', (email, username, password) => {
  cy.request('POST', '/api/users', {
    user: {
      email,
      username,
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

    cy.getCookie('auth').then((cookie) => {
      cy.log('Auth cookie set:', cookie);
    });
  });
});

Cypress.Commands.add('createArticle', (title, description, body) => {
  cy.getCookie('auth').then((cookie) => {
    if (!cookie) {
      throw new Error('Auth cookie not found');
    }
    const authToken = cookie.value;

    cy.request({
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

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  return cy.get(`[placeholder="${placeholder}"]`);
});
