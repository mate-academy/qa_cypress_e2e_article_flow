// cypress/support/commands.js

// 1. Command to register a new user via API
Cypress.Commands.add('register', (username, email, password) => {
  cy.request('POST', '/api/users', {
    user: { username, email, password }
  });
});

// 2. Command to log in via the UI Modal and extract the token from the cookie
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/');

  // Click the "Sign in" link in the navigation bar
  cy.contains('Sign in').click();

  // Fill out the login form in the modal
  cy.get('input[placeholder="Email"]').type(email);
  cy.get('input[placeholder="Password"]').type(password);
  cy.get('button[type="submit"]').click();

  // Assert that we successfully logged in
  cy.contains('New Article', { timeout: 10000 }).should('be.visible');

  // UPDATED: Extract the token from the 'auth' cookie
  cy.getCookie('auth').then((cookie) => {
    if (cookie) {
      Cypress.env('authToken', cookie.value);
    } else {
      // Fallback to localStorage just in case
      cy.window().then((win) => {
        Cypress.env('authToken', win.localStorage.getItem('jwt'));
      });
    }
  });
});

// 3. Command to create an article programmatically via API
Cypress.Commands.add('createArticle', (article) => {
  // Retrieve the token saved during UI login
  const token = Cypress.env('authToken');

  cy.request({
    method: 'POST',
    url: '/api/articles',
    headers: {
      Authorization: `Token ${token}`
    },
    body: {
      article: {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList || []
      }
    }
  }).then((response) => {
    return response.body.article;
  });
});
