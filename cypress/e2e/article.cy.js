/* eslint-disable cypress/no-unnecessary-waiting */
const { faker } = require('@faker-js/faker');

describe('Article Flow', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should create the article', () => {
    // generate User

    const randomNumber = faker.number.int({ min: 1000, max: 9999 });
    const username = faker.person.firstName() + String(randomNumber);
    const email = username + '@gmail.com';
    const password = '12345Qwert!';
    cy.login(email, username, password);

    // generateArticle

    const title = faker.word.adjective() + faker.word.noun();
    const description = faker.lorem.sentence();
    const body = faker.lorem.paragraphs({ min: 2, max: 5, separator: '\n\n' });
    const tags = faker.word.adjective();

    // I still use createArticle because this is written in task
    cy.createArticle(title, description, body, tags);
    cy.contains('a', 'Home')
      .click();
    cy.contains('a', 'Global Feed')
      .click();
    cy.contains('h1', `Article title: ${title}`)
      .should('exist');
  });

  it('should delete the article', () => {
    // generateUser
    const randomNumber = faker.number.int({ min: 1000, max: 9999 });
    const username = faker.person.firstName() + String(randomNumber);
    const email = username + '@gmail.com';
    const password = '12345Qwert!';
    cy.login(email, username, password);

    // generateArticle

    const title = faker.word.adjective() + ' ' + faker.word.noun();
    const description = faker.lorem.sentence();
    const body = faker.lorem.paragraphs({ min: 2, max: 5, separator: '\n\n' });
    const tags = faker.word.adjective();

    // I still use createArticle because this is written in task
    cy.createArticle(title, description, body, tags);
    cy.contains('a', 'Home')
      .click();
    cy.wait(500);
    cy.contains('a', 'Global Feed')
      .click();
    cy.wait(500);
    cy.contains('a', `Article title: ${title}`)
      .click();
    cy.contains('button', ' Delete Article')
      .click();
    cy.contains('a', 'Global Feed')
      .click();
    cy.contains('a', 'Your Feed')
      .click();
    cy.contains('a', 'Global Feed')
      .click();
    cy.contains('h1', `Article title: ${title}`)
      .should('not.exist');
  });
});
