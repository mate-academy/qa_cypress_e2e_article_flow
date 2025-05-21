import { faker } from '@faker-js/faker';

describe('page', () => {
  beforeEach(() => {
    cy.visit('https://conduit.mate.academy/');
  });

  it('should provide the ability to create a post after login', () => {
    const userName = faker.person.lastName();
    const userMail = faker.internet.email();
    cy.register(userMail, userName, '321123');

    cy.get(':nth-child(2) > .nav-link').click();

    cy.get(':nth-child(4) > .nav-link').click();

    cy.url().should('include', userName.toLowerCase());

    cy.createArticle(
      faker.lorem.words(3),
      faker.lorem.sentence(),
      faker.lorem.paragraph(10)
    );

    cy.reload();
    cy.get('.article-meta > :nth-child(1) > .hide-text').should('exist');
  });

  it('should provide the ability to delete a post after login', () => {
    const userName = faker.person.lastName();
    const userMail = faker.internet.email();
    cy.register(userMail, userName, '321123');

    cy.reload();

    cy.createArticle(
      faker.lorem.words(3),
      faker.lorem.sentence(),
      faker.lorem.paragraph(10)
    );

    cy.reload();

    cy.get(':nth-child(4) > .nav-link').click();

    cy.get('.article-meta > :nth-child(1) > .hide-text').should('exist');

    cy.get('.preview-link > span').click();

    cy.get(
      '.article-actions > .article-meta > :nth-child(3) > .btn-outline-danger'
    ).click();

    cy.get('.article-preview').should(
      'contain.text',
      'No articles are here... yet.'
    );
  });
});
