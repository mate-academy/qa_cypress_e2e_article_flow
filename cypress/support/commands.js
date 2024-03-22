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

Cypress.Commands.add('login', (userObject) => {
  cy.request('POST', '/api/users', {
    user: {
      email: userObject.email,
      username: userObject.username,
      password: userObject.password
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
});

Cypress.Commands.add('createArticle', (articleObject) => {
  cy.getCookie('auth').then((token) => {
    const authToken = token.value;

    cy.request({
      method: 'POST',
      url: '/api/articles',
      body: {
        article: {
          title: articleObject.title,
          description: articleObject.description,
          body: articleObject.body,
          tagList: []
        }
      },
      headers: {
        Authorization: `Token ${authToken}`
      }
    });
  });
});

Cypress.Commands.add('checkArticle', (article, user) => {
  const profileUrl = `/profile/${user.username.toLowerCase()}`;
  cy.visit(profileUrl);

  cy.get('.preview-link')
    .should('contain.text', article.title);
  cy.get('.preview-link')
    .should('contain.text', article.description);

  cy.get('h1').click();

  cy.get('[class="row article-content"]')
    .should('contain.text', article.body);
});

Cypress.Commands.add('deleteArticle', (article, user) => {
  cy.contains(article.title).click();
  cy.get('.ion-trash-a').first().click();
});

Cypress.Commands.add('checkArticleDeleted', () => {
  cy.get('.article-preview')
    .should('contain.text', 'No articles are here... yet.');
});

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});