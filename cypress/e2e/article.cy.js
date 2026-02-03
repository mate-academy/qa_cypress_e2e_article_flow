import { faker } from '@faker-js/faker';

describe('Article flow', () => {
  let article;

  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(10),
    username: faker.internet.userName(),
  };

  before(() => {
    // Register a unique user via API
    cy.request('POST', '/api/users', {
      user,
    });
  });

  beforeEach(() => {
    article = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      tag: faker.lorem.word(),
    };

    cy.login(user.email, user.password);
  });

  it('should create an article successfully', () => {
    cy.createArticle(article);

    cy.contains('h1', article.title)
      .should('be.visible');

    cy.contains(article.body)
      .should('be.visible');

    cy.contains(article.tag)
      .should('be.visible');
  });

  it('should delete an article successfully', () => {
    cy.createArticle(article);

    cy.contains('button', 'Delete Article')
      .click();

    cy.contains('Global Feed')
      .should('be.visible');

    cy.contains(article.title)
      .should('not.exist');
  });
});
