// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// sign up better reflects what we do

Cypress.Commands.add('signUp', (user2) => {
  cy.request('POST', '/api/users', {
    user: user2
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

// this is not very elegant solution but dont have better idea for now
// getcookies returns an array of cookies, and at ids of 2 and 3 are
// auth token and article slug saved earlier
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

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  return cy.get(`[placeholder = "${placeholder}"]`);
});
