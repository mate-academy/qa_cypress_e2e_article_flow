import faker from 'faker';

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
      effectiveImage: 
        'https://static.productionready.io/images/smiley-cyrus.jpg',
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
  cy.visit('/editor');
  cy.get('[placeholder="Article Title"]').type(title);
  cy.get('[placeholder="What\'s this article about?"]').type(description);
  cy.get('[placeholder="Write your article (in markdown)"]').type(body);
  cy.get('[type="button"]').contains('Publish').click();
  cy.get('.article-page').should('exist');
});
