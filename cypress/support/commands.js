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

    cy.window().then((win) => {
      win.localStorage.setItem('user', JSON.stringify(user));
    });
  });
});

Cypress.Commands.add('createArticle', (title, description, body, tags = []) => {
  return cy.window().then((win) => {
    const user = JSON.parse(win.localStorage.getItem('user'));
    const authToken = user.token;

    return cy.request({
      method: 'POST',
      url: '/api/articles',
      body: {
        article: {
          title,
          description,
          body,
          tagList: tags,
        },
      },
      headers: {
        Authorization: `Token ${authToken}`,
      },
    }).then((resp) => resp.body.article.slug);
  });
});

Cypress.Commands.add('deleteArticle', (slug) => {
  return cy.window().then((win) => {
    const user = JSON.parse(win.localStorage.getItem('user'));
    const authToken = user.token;

    return cy.request({
      method: 'DELETE',
      url: `/api/articles/${slug}`,
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
  });
});
