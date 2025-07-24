// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on-cypress.io/custom-commands
// ***********************************************

// Команда для входу в систему через API
// Вона реєструє нового користувача та входить за нього, повертаючи токен
Cypress.Commands.add('login', () => {
  // Використовуємо Cypress task для генерації даних користувача
  return cy.task('generateUser').then((user) => {
    // 1. Реєструємо користувача через API
    cy.request('POST', '/api/users', {
      user: {
        username: user.username,
        email: user.email,
        password: user.password
      }
    }).then((registerResponse) => {
      expect(registerResponse.status).to.be.oneOf([200, 201]);

      // 2. Входимо в систему через API, щоб отримати токен
      return cy.request('POST', '/api/users/login', {
        user: {
          email: user.email,
          password: user.password
        }
      }).then((loginResponse) => {
        expect(loginResponse.status).to.eq(200);

        const token = loginResponse.body.user.token;

        return { user, token };
      });
    });
  });
});

// Команда для створення статті через API
Cypress.Commands.add('createArticle', (articleData) => {
  // Отримуємо токен з localStorage, який має бути встановлений після API-входу
  return cy.window().then((win) => {
    const token = win.localStorage.getItem('jwt');
    if (!token) {
      throw new Error(
        'JWT token not found in localStorage. Please ensure cy.login() was' +
        ' called and succeeded before calling cy.createArticle().'
      );
    }

    return cy.request({
      method: 'POST',
      url: '/api/articles',
      headers: {
        Authorization: `Token ${token}`
      },
      body: {
        article: articleData
      }
    }).then((response) => {
      expect(response.status).to.eq(200); // Conduit API повертає 200 OK
      return response.body.article; // Повертаємо створену статтю
    });
  });
});
