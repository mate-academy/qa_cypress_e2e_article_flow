const imgUrl = 'https://static.productionready.io/images/smiley-cyrus.jpg';

// Register a user (only once)
Cypress.Commands.add('register', (email, username, password) => {
  return cy.request({
    method: 'POST',
    url: '/api/users',
    body: { user: { email, username, password } },
    failOnStatusCode: false, // optional: ignore if user exists
  });
});

// Login user (use beforeEach)
Cypress.Commands.add('login', (email, password) => {
  return cy.request({
    method: 'POST',
    url: '/api/users/login',
    body: { user: { email, password } },
  }).then((response) => {
    const user = response.body.user;
    cy.window().then((win) => {
      win.localStorage.setItem('user', JSON.stringify(user));
    });
  });
});

// createArticle / deleteArticle stay the same as before
Cypress.Commands.add('createArticle', (title, description, body, tags = []) => {
  return cy.window().then((win) => {
    const user = JSON.parse(win.localStorage.getItem('user'));
    return cy.request({
      method: 'POST',
      url: '/api/articles',
      body: { article: { title, description, body, tagList: tags } },
      headers: { Authorization: `Token ${user.token}` },
    }).then((resp) => resp.body.article.slug);
  });
});

Cypress.Commands.add('deleteArticle', (slug) => {
  return cy.window().then((win) => {
    const user = JSON.parse(win.localStorage.getItem('user'));
    return cy.request({
      method: 'DELETE',
      url: `/api/articles/${slug}`,
      headers: { Authorization: `Token ${user.token}` },
    });
  });
});
