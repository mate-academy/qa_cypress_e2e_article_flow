Cypress.Commands.add('login', (email, username, password) => {
  return cy.request({
    method: 'POST',
    url: 'https://conduit.mate.academy/api/users',
    failOnStatusCode: false,
    body: {
      user: {
        email,
        username,
        password
      }
    }
  }).then(() => {
    return cy.request({
      method: 'POST',
      url: 'https://conduit.mate.academy/api/users/login',
      body: {
        user: {
          email,
          password
        }
      }
    }).then((response) => {
      window.localStorage.setItem('user', JSON.stringify(response.body.user));
    });
  });
});

Cypress.Commands.add('createArticle', (title, description, body) => {
  return cy.then(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const token = user.token;

    return cy.request({
      method: 'POST',
      url: 'https://conduit.mate.academy/api/articles',
      headers: {
        Authorization: `Token ${token}`
      },
      body: {
        article: {
          title,
          description,
          body,
          tagList: [] // 🟢 Обов’язкове поле для API Conduit
        }
      }
    });
  });
});
