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

Cypress.Commands.add('createArticleAPI', (articleData) => {
  cy.getCookie('auth').then((token) => {
    const authToken = token.value;

    const {
      title,
      description,
      body,
      tag
    } = articleData;
    cy.request({
      method: 'POST',
      url: '/api/articles',
      body: {
        article: {
          title,
          description,
          body,
          tagList: [tag]
        }
      },
      headers: {
        Authorization: `Token ${authToken}`
      }
    });
  });
});

Cypress.Commands.add('createArticleUI', (articleData) => {
  const {
    title,
    description,
    body,
    tag
  } = articleData;
  cy.get('input[placeholder="Article Title"]').type(title);
  cy.get('input[placeholder="What\'s this article about?"]').type(description);
  cy.get('textarea[placeholder="Write your article (in markdown)"]').type(body);
  cy.get('input[placeholder="Enter tags"]').type(tag);
  cy.get('button').contains('Publish Article').click();
  cy.get('button').contains('Publish Article').click();
});

Cypress.Commands.add('verifyArticleData', (articleData) => {
  const {
    title,
    body,
    tag
  } = articleData;
  cy.get('h1').should('contain.text', title);
  cy.get('div > p').should('contain.text', body);
  cy.get('li.tag-default.tag-pill.tag-outline').should('contain.text', tag);
});

Cypress.Commands.add('goGlobalFeed', () => {
  cy.contains('a', 'Global Feed').click();
});
