
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
      effectiveImage:
      'https://static.productionready.io/images/smiley-cyrus.jpg',
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
  cy.getCookie('auth').then((token) => {
    const authToken = token.value;

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

Cypress.Commands.add('deleteArticle', () => {
  cy.get('@createdArticleSlug').then((articleSlug) => {
    cy.getCookie('auth').then((token) => {
      const authToken = token.value;

      cy.request({
        method: 'DELETE',
        url: `/api/articles/${articleSlug}`,
        headers: {
          Authorization: `Token ${authToken}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
