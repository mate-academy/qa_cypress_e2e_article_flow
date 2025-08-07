// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('registerAndLogin', () => {
  const timestamp = Date.now();
  const email = `testuser_${timestamp}@example.com`;
  const username = `user_${timestamp}`;
  const password = `Password_${timestamp}_!`;
  const imgUrl = 'https://static.productionready.io/images/smiley-cyrus.jpg';

  return cy.request('POST', '/api/users', {
    user: {
      email,
      username,
      password
    },
    failOnStatusCode: false
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`❌ Користувача створити не вдалося: ${JSON
    .stringify(response.body.errors)}`);
    }

    const user = {
      bio: response.body.user.bio,
      effectiveImage: imgUrl,
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username
    };

    return cy.window().then((win) => {
      win.localStorage.setItem('user', JSON.stringify(user));
    }).then(() => {
      return cy.setCookie('auth', response.body.user.token);
    }).then(() => {
      return cy.wrap({ email, username, password });
    });
  });
});

Cypress.Commands.add('createArticle', (title, description, body) => {
  return cy.window().then((win) => {
    const storedUser = JSON.parse(win.localStorage.getItem('user'));
    const token = storedUser?.token;

    if (!token) {
      throw new Error(
'❌ Token not found in localStorage. Did you forget to call registerAndLogin()?'
      );
    }

    return cy.request({
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
        Authorization: `Token ${token}`
      }
    });
  });
});
