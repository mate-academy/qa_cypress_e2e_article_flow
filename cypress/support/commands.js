const imgUrl = 'https://static.productionready.io/images/smiley-cyrus.jpg';

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
      effectiveImage: imgUrl,
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('auth', response.body.user.token);
  });
});

const { faker } = require('@faker-js/faker');

Cypress.Commands.add('createArticle', () => {
  const title = faker.lorem.words(2);
  const description = faker.lorem.sentence();
  const body = faker.lorem.paragraph();
  const tagList = ['test1', 'test2'];

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
          tagList
        }
      },
      headers: {
        Authorization: `Token ${authToken}`
      }
    }).then((response) => {
      return {
        title,
        description,
        body,
        tagList: tagList.join(','),
        slug: response.body.article.slug
      };
    });
  });
});

Cypress.Commands.add('findByPlaceholder', (placeholder) =>
  cy.get(`[placeholder="${placeholder}"]`)
);
