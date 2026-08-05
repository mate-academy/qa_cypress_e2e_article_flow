Cypress.Commands.add('login', (email, username, password) => {
  cy.request({
    method: 'POST',
    url: '/api/users',
    body: {
      user: {
        email,
        username,
        password
      }
    }
  }).then((response) => {
    expect(response.status).to.eq(200);

    const loggedUser = response.body.user;

    const user = {
      bio: loggedUser.bio,
      effectiveImage:
        'https://static.productionready.io/images/smiley-cyrus.jpg',
      email: loggedUser.email,
      image: loggedUser.image,
      token: loggedUser.token,
      username: loggedUser.username
    };

    Cypress.env('token', loggedUser.token);

    cy.visit('/');

    cy.window().then((win) => {
      win.localStorage.setItem(
        'user',
        JSON.stringify(user)
      );
    });

    cy.setCookie('auth', loggedUser.token);

    cy.reload();

    cy.contains(loggedUser.username)
      .should('be.visible');
  });
});

Cypress.Commands.add(
  'createArticle',
  (title, description, body) => {
    const token = Cypress.env('token');

    assert.isDefined(
      token,
      'Authorization token should exist'
    );

    return cy.request({
      method: 'POST',
      url: '/api/articles',
      headers: {
        Authorization: `Token ${token}`
      },
      body: {
        article: {
          title,
          description,
          body,
          tagList: []
        }
      }
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]);

      return response.body.article;
    });
  }
);
