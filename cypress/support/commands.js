
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
      effectiveImage: 'https://smiley-cyrus.jpg',
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
    }).then((response) => {
      cy.setCookie('slug', response.body.article.slug);
    });
  });
});

// almost there... :/
// Cypress.Commands.add('deleteArticle', () => {
//   cy.getCookies().then((cookies) => {
//     const articleSlug = cookies.find((cookie) => cookie.name === 'articleSlug').value;
//     const authToken = cookies.find((cookie) => cookie.name === 'authToken').value;
Cypress.Commands.add('deleteArticle', () => {
  cy.getCookies().then((cookies) => {
    const articleSlug = cookies[3].value;
    const authToken = cookies[2].value;

    cy.request({
      method: 'DELETE',
      url: `/api/articles/${articleSlug}`,
      headers: {
        Authorization: `Token ${authToken}`
      }
    });
  });
});
