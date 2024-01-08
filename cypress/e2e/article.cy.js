/// <reference types="cypress" />
const faker = require('faker');


describe('Article page', () => {
  let user;
  let article = {
    title: faker.lorem.word(),
    description: faker.lorem.words(),
    body: faker.lorem.words()
  }

  beforeEach(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should allow user to create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');

    // cy.findByPlaceholder('Article Title').type(article.title);
    // cy.findByPlaceholder('What\'s this article about?').type(article.description);
    // cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    // cy.get('[type="button"]').contains('Publish Article').click();
    cy.createArticle(article.title, article.description, article.body);
    cy.get('[alt="your profile image"]').click();
    cy.get('.article-preview').should('contain', article.title);

  });

  it('should allow user to delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/');

    cy.createArticle(article.title, article.description, article.body);
    cy.get('[alt="your profile image"]').click();
    cy.get('.article-preview').contains(article.title).click();
    cy.get('.container.page').contains('Delete Article').click();
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal('Do you really want to delete it?');
    });
    cy.get('[alt="your profile image"]').click();
    cy.get('.article-preview').should('not.contain', article.title);
  });
});
