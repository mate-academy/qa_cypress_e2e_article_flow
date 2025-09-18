/* eslint max-len: ["off"] */
/// <reference types="cypress" />

describe('Article Flow', () => {
  const imgUrl = 'https://static.productionready.io/images/smiley-cyrus.jpg';

  // Custom login that ensures user exists
  Cypress.Commands.add('loginOrRegister', (email, username, password) => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      body: { user: { email, username, password } },
      failOnStatusCode: false // don't fail if user exists
    }).then(() => {
      // Always login after register attempt
      cy.request('POST', '/api/users/login', {
        user: { email, password }
      }).then((res) => {
        const user = {
          bio: res.body.user.bio,
          email: res.body.user.email,
          image: res.body.user.image || imgUrl,
          token: res.body.user.token,
          username: res.body.user.username
        };
        window.localStorage.setItem('user', JSON.stringify(user));
        cy.setCookie('auth', res.body.user.token);
      });
    });
  });

  describe('Create Article', () => {
    let user;
    let article;

    before(() => {
      const uniqueId = Date.now();
      user = {
        email: `test${uniqueId}@mail.com`,
        username: `user${uniqueId}`,
        password: 'Password123!'
      };
      article = {
        title: `Test Article ${uniqueId}`,
        description: 'Cypress article test description',
        body: 'This is the body of the Cypress test article'
      };
      cy.loginOrRegister(user.email, user.username, user.password);
    });

    it('creates a new article', () => {
      cy.visit('/editor');

      cy.get('input[placeholder="Article Title"]').type(article.title);
      cy.get('input[placeholder*="this article about"]').type(article.description);
      cy.get('textarea[placeholder*="Write your article"]').type(article.body);

      cy.contains('button', 'Publish Article').click();

      cy.url().should('include', '/article/');
      cy.contains('h1', article.title).should('be.visible');
      cy.contains('p', article.body).should('be.visible');

      // Optional cleanup: delete created article to isolate tests
      cy.contains('button', 'Delete Article').click();
      cy.visit(`/@${user.username}`);
      cy.contains('a', article.title).should('not.exist');
    });
  });

  describe('Delete Article', () => {
    let user;
    let article;

    beforeEach(() => {
      const uniqueId = Date.now();
      user = {
        email: `delete${uniqueId}@mail.com`,
        username: `deleteUser${uniqueId}`,
        password: 'Password123!'
      };
      article = {
        title: `Article To Delete ${uniqueId}`,
        description: 'Delete flow description',
        body: 'Body for delete flow'
      };
      cy.loginOrRegister(user.email, user.username, user.password);
      cy.createArticle(article.title, article.description, article.body);
    });

    it('deletes the article deterministically', () => {
      cy.visit(`/@${user.username}`);
      cy.contains('a', article.title).click();

      cy.contains('button', 'Delete Article').click();

      // Verify deletion by visiting profile
      cy.visit(`/@${user.username}`);
      cy.contains('a', article.title).should('not.exist');

      // Optionally, also verify visiting article URL shows 404 or missing title
      cy.visit(`/article/${article.title.replace(/\s/g, '-')}`);
      cy.contains('h1', article.title).should('not.exist');
    });
  });
});
