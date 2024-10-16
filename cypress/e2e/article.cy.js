const { faker } = require('@faker-js/faker');

describe('Article CRUD', () => {
  before(() => {
  });
  const articleTitle = faker.word.words(1);
  const articleTopic = faker.word.words(2);
  const articleDescription = faker.word.words(5);
  const articleTag = faker.word.words(1);

  it('should create new article', () => {
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);
    });
    cy.contains('.nav-link', 'New Article').click();
    cy.get('[placeholder="Article Title"]').type(articleTitle);
    cy.get('[placeholder="What\'s this article about?"]').type(articleTopic);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(articleDescription);
    cy.get('[placeholder="Enter tags"]').type(`${articleTag}{enter}`);
    cy.contains('.btn', 'Publish Article').click();
    cy.url().should('contain', 'article/');
  });

  it('shoud delete created article', () => {
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);
    });
    cy.createArticle(articleTitle, articleTopic, articleDescription);
    cy.contains('.btn', 'Delete Article').click();
    cy.url().should('contain', 'https://conduit.mate.academy/');
  });
});
