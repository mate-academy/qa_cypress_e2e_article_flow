/* eslint-disable max-len */

describe('Article Flow', () => {
  const timestamp = Date.now();

  const user = {
    username: `Vika${timestamp}`,
    email: `vika${timestamp}@test.com`,
    password: 'Password123!'
  };

  before(() => {
    cy.login(user.email, user.username, user.password);
  });

  it('should create an article', () => {
    const articleTitle = `JavaScript ${timestamp}`;
    const articleDescription = `Test Description ${timestamp}`;
    const articleBody = `Test Body ${timestamp}`;

    cy.createArticle(articleTitle, articleDescription, articleBody);

    cy.visit('/');
    cy.contains('a.nav-link', user.username.toLowerCase()).click();
    cy.contains(articleTitle).should('be.visible');
  });

  it('should delete an article', () => {
    const articleTitle = `JS Delete ${Date.now()}`;
    const articleDescription = 'Description for deletion';
    const articleBody = 'Body for deletion';

    cy.createArticle(articleTitle, articleDescription, articleBody);

    cy.visit('/');
    cy.contains('a.nav-link', user.username.toLowerCase()).click();
    cy.contains(articleTitle).click();

    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Do you really want to delete it?');
      return true;
    });

    cy.contains('.btn.btn-outline-danger.btn-sm', 'Delete Article').click();
    cy.contains(articleTitle).should('not.exist');
  });
});
