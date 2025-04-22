const { faker } = require('@faker-js/faker');

describe('Create article', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user.email, user.username, user.password);
    });
  });

  it('should allow to create an article', () => {
    article = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(2)
    };

    cy.contains('nav-link', 'New Article').click();

    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get(`[placeholder="What's this article about?"]`).type(
      article.description
    );
    // eslint-disable-next-line max-len
    cy.get('[placeholder="Write your article (in markdown)"]').type(
      article.body
    );

    cy.get('.btn').click();

    cy.contains(article.title).should('exist');
  });

  it('should allow to delete articles', () => {
    article = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(2)
    };

    cy.contains(article.title).should('exist');

    cy.contains('button', 'Delete Article').click();

    cy.contains('No articles are here... yet.').should('exist');
  });
});
