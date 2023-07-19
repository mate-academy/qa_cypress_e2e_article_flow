const faker = require('faker');
let article; 
let user;

describe('Article flow suit', () => {
  beforeEach(() => {
    article = {
      title: faker.lorem.word() + Math.floor(Math.random(1000) * 1000),
      description: faker.lorem.words(),
      body: faker.lorem.words(),
      tags: String([faker.lorem.word(), faker.lorem.word()]),
    };
    user = {
      username: 'joebin1'
    };
    cy.login();
  });

  it('should create an article', () => {
    cy.get('[href="/editor"]').click();
    cy.pickPlaceholder('Article Title').type(article.title);
    cy.pickPlaceholder('What\'s this article about?').type(article.description);
    cy.pickPlaceholder('Write your article (in markdown)').type(article.body);
    cy.pickPlaceholder('Enter tags').type(article.tags);

    cy.contains('button', 'Publish').click() 
    cy.contains('h1', article.title).should('be.visible');
    cy.contains('a', 'Edit Article').should('be.visible');
    cy.contains('p', article.body).should('be.visible');
    cy.get(`[href="/profile/${user.username}"]`).should('contain', user.username);
  });

  it('should delete article', () => {
    cy.get('[href="/editor"]').click();
    cy.pickPlaceholder('Article Title').type(article.title);
    cy.pickPlaceholder('What\'s this article about?').type(article.description);
    cy.pickPlaceholder('Write your article (in markdown)').type(article.body);
    cy.pickPlaceholder('Enter tags').type(article.tags);

    cy.contains('button', 'Publish').click() 
    cy.contains('h1', article.title).should('be.visible');
    cy.contains('a', 'Edit Article').should('be.visible');
    cy.contains('p', article.body).should('be.visible');
    cy.get(`[href="/profile/${user.username}"]`).should('contain', user.username);

    cy.contains('button',' Delete Article',).click();
    cy.on('window:confirm', () => true);

    cy.visit(`/profile/${user.username}`);

    cy.get('.preview-link').should('not.have.text', article.title);
    cy.get('.preview-link').should('not.have.text', article.description);
  });
});
