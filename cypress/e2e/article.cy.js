const { faker } = require('@faker-js/faker');

describe('Create and delete article', () => {
  let email, username, password;
  let articleTitle, articleDescription, articleBody;

  before(() => {
    email = faker.internet.email();
    username = 'user' + faker.string.alphanumeric(6);
    password = faker.internet.password();
  });

  beforeEach(() => {
    articleTitle = 'Test Title ' + faker.string.alphanumeric(4);
    articleDescription = 'Test Description';
    articleBody = 'Test Body';

    return cy.registerAndLogin()
      .then(({ email: e, username: u, password: p }) => {
        email = e;
        username = u;
        password = p;
      });
  });

  it('Should create article via UI', () => {
    cy.visit('/editor');

    cy.get('input[placeholder="Article Title"]').type(articleTitle);
    cy.get('input[placeholder="What\'s this article about?"]')
      .type(articleDescription);
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type(articleBody);
    cy.get('input[placeholder="Enter tags"]').type('tag1, tag2');
    cy.contains('button', 'Publish Article').click();

    cy.contains('h1', articleTitle).should('exist');
    cy.url().should('include', '/article/');
  });

  it('Should delete article via UI after creating it via API', () => {
    cy.createArticle(articleTitle, articleDescription, articleBody);

    cy.visit(`/profile/${username}`);
    cy.get('.article-preview').contains(articleTitle).click();

    cy.contains('button', 'Delete Article').click();

    cy.url().should('eq', Cypress.config().baseUrl);
    cy.reload();

    cy.get('.article-preview').should('not.contain', articleTitle);
  });
});
