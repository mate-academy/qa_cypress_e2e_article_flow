const { faker } = require('@faker-js/faker');

describe('Delete Article Flow', () => {
  let user;
  const title = faker.lorem.words(4);
  const description = faker.lorem.sentence();
  const body = faker.lorem.paragraphs(2);

  before(() => {
    cy.task('generateUser').then((newUser) => {
      user = newUser;

      cy.login(user.email, user.username, user.password);
      cy.createArticle(title, description, body);
    });
  });

  it('should create and delete the article', () => {
    cy.visit('/');
    cy.contains(user.username.toLowerCase()).click();
    cy.contains(title).click();
    cy.contains('Delete Article').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}`);
    cy.contains(user.username.toLowerCase()).click();
    cy.reload();
    cy.contains(title).should('not.exist');
  });
});
