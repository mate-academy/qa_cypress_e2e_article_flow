const faker = require('faker');

Cypress.Commands.add('login', (email, username, password) => {
  cy.request('POST', '/api/users/login', {
    user: {
      email: 'joebin@gmail.com',
      username: 'joebin1',
      password: 'joebin1'
    }
  }).then(response => {
    const user = {
      bio: response.body.user.bio,
      effectiveImage: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('auth', response.body.user.token);
  });
  cy.visit('/');
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
  }).then((response) => {
    let slug;
    slug = response.body.article.slug;
    cy.visit(`article/${slug}`)});
});

Cypress.Commands.add('pickPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`)
})