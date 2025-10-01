const imgUrl = 'https://static.productionready.io/images/smiley-cyrus.jpg';

Cypress.Commands.add('login', (email, username, password) => {
  cy.request('POST', '/api/users', {
    user: {
      email,
      username,
      password,
    },
  }).then((response) => {
    const user = {
      bio: response.body.user.bio,
      effectiveImage: imgUrl,
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username,
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('auth', response.body.user.token);
  });
});

Cypress.Commands.add('createArticle', (title, description, body, tags = []) => {
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
          tagList: tags,   // ✅ always use tagList
        },
      },
      headers: {
        Authorization: `Token ${authToken}`,
      },
    }).then((resp) => resp.body.article.slug); // return slug for chaining
  });
});

Cypress.Commands.add('deleteArticle', (slug) => {
  return cy.getCookie('auth').then((token) => {
    const authToken = token.value;

    return cy.request({
      method: 'DELETE',
      url: `/api/articles/${slug}`,
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
  });
});
