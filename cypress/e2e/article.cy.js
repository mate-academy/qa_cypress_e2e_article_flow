/// <reference types='cypress' />
const { faker } = require('@faker-js/faker');

describe('', () => {
  const title = faker.lorem.words(5);
  const description = faker.lorem.sentence(5);
  const articleBody = faker.lorem.paragraph(1);
  const tags = faker.lorem.word(1);
  before(() => {
    cy.visit('/');
    // cy.get(':nth-child(3) > .nav-link').click();
    cy.task('generateUser').then((data) => {
      const { username, email, password } = data;

      cy.login(email, username, password);
      cy.reload();
    });
  });

  it('Should bu sign up', () => {
    cy.get('.container > .nav > :nth-child(2) > .nav-link').click();
    cy.get(':nth-child(1) > .form-control').type(title);
    cy.get('[placeholder="What\'s this article about?"]').type(description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(articleBody);
    cy.get('[placeholder="Enter tags"]').type(tags + '{enter}');
    cy.get('.btn').click();
    cy.contains('.nav-link', 'Home').click();
    cy.get('.nav > :nth-child(2) > .link').click();
    cy.get('.article-preview').contains('h1', `Article title: ${title}`);
  });

  it('should find new article', () => {
    cy.createArticle(title, description, articleBody);

    cy.contains('.nav-link', 'Global Feed').click();
    cy.get('.article-preview').contains('h1', `Article title: ${title}`).click();

    cy.contains('button', 'Delete Article').type('{enter}');

    cy.contains('.nav-link', 'Global Feed').click();
    cy.get('h1').should('not.have.value', `Article title: ${title}`);
  });
});
