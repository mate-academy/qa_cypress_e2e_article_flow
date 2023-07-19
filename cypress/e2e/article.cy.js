/// <reference types='cypress' />
/// <reference types='../support' />

const faker = require('faker');

describe('conduit article flow', () => {
  let article;

  const randomTitle = faker.random.word();
  const randomDescription = faker.random.words();
  const randomBody = faker.random.words();
  const randomTags = 'Tag' + Cypress._.random(1, 10) + ',Tag' + Cypress._.random(11, 20);

  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('/editor');
      article = {
        title: randomTitle,
        description: randomDescription,
        body: randomBody,
        tags: randomTags,
      };
    });
  });

  it('should allow to create and delete article', () => {
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]').type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.get('[placeholder="Enter tags"]').type(article.tags);

    cy.contains('button', 'Publish Article').click();
    cy.url().should('include', '/article/');
  });

  it('should allow to delete the article', () => {
    cy.get('[href="/editor"]').click();
    cy.findByPlaceholder('Article Title').then($el => {
      cy.wrap($el).type(article.title);
    });
    cy.findByPlaceholder('What\'s this article about?').then($el => {
      cy.wrap($el).type(article.description);
    });
    cy.findByPlaceholder('Write your article (in markdown)').then($el => {
      cy.wrap($el).type(article.body);
    });
    cy.findByPlaceholder('Enter tags').then($el => {
      cy.wrap($el).type(article.tags);
    });
  });
});
