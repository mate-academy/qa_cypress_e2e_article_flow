const { faker } = require('@faker-js/faker');

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://conduit.mate.academy/');

    const username = 'hupaqorage@mailinator.com';
    const password = 'Pa$$w0rd!';

    cy.get(':nth-child(2) > .nav-link').click();
    cy.get(':nth-child(1) > .form-control').type(username);
    cy.get(':nth-child(2) > .form-control').type(password);
    cy.get('.btn').click();

    cy.get(':nth-child(1) > .nav-link').click();

    cy.visit('https://conduit.mate.academy/editor');

    cy.get(':nth-child(1) > .form-control').type(faker.lorem.words(3));
    cy.get(':nth-child(2) > .form-control').type(faker.lorem.words(5));
    cy.get(':nth-child(3) > .form-control').type(faker.lorem.words(15));
    cy.get(':nth-child(4) > .form-control').type(faker.lorem.words(1));

    cy.get('.btn').click();
    cy.get('.btn').click();

    cy.get(
      '.article-actions > .article-meta > :nth-child(3) > .btn-outline-danger'
    ).click();
  });
});
