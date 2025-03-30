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

// Логін користувача через API
// Реєстрація користувача через API
// Реєстрація користувача через API

Cypress.Commands.add('registerUser', (email, username, password) => {
  cy.request({
    method: 'POST',
    url: '/api/users',
    body: {
      user: {
        email,
        username,
        password
      }
    },
    failOnStatusCode: false // Додано, щоб уникнути помилки через вже зайнятий email
  }).then((response) => {
    if (response.status === 422) {
      cy.log('Ця електронна пошта або ім\'я користувача вже використовується.');
    } else {
      expect(response.status).to.eq(200); // Перевірка, що користувач зареєстрований
    }
  });
});

// Логін користувача через API
Cypress.Commands.add('login', (email, username, password) => {
  cy.request({
    method: 'POST',
    url: '/api/users/login',
    body: {
      user: {
        email,
        password
      }
    }
  }).then((response) => {
    expect(response.status).to.eq(200); // Перевірка, що логін успішний

    const user = {
      bio: response.body.user.bio,
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username
    };
    // Зберігаємо дані користувача в localStorage
    window.localStorage.setItem('user', JSON.stringify(user));

    // Встановлюємо auth-токен як кукі
    cy.setCookie('auth', response.body.user.token);
  });
});
