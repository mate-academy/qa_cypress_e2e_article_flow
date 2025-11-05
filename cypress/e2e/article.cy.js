/// <reference types="cypress" />

describe('Article flow', () => {
  const uniqueId = Date.now();
  const user = {
    email: `user_${uniqueId}@example.com`,
    username: `user_${uniqueId}`,
    password: 'Password123!'
  };

  const article = {
    title: `Test Article ${uniqueId}`,
    description: 'This is an article created by Cypress test',
    body: 'This article body is used to verify create and delete flows',
    tagList: ['cypress', 'testing']
  };

  before(() => {
    // Register a new user before tests
    cy.request('POST', 'https://api.realworld.io/api/users', { user })
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

  context('Create article', () => {
    beforeEach(() => {
      cy.login(user.email, user.password); // custom command
    });

    it('should create a new article', () => {
      cy.visit('/');
      cy.contains('New Article').click();

      cy.get('input[placeholder="Article Title"]').type(article.title);
      cy.get('input[placeholder="What\'s this article about?"]')
        .type(article.description);
      cy.get('textarea[placeholder="Write your article (in markdown)"]')
        .type(article.body);
      cy.get('input[placeholder="Enter tags"]')
        .type(`${article.tagList.join(', ')}{enter}`);

      cy.contains('Publish Article').click();

      cy.url().should('include', '/article/');
      cy.contains(article.title).should('be.visible');
      cy.contains(article.body).should('be.visible');
    });
  });

  context('Delete article', () => {
    beforeEach(() => {
      cy.login(user.email, user.password);
      cy.createArticle(article);
    });

    it('should delete the article successfully', () => {
      cy.contains(article.title).click();
      cy.contains('Delete Article').click();

      cy.url().should('eq', 'https://conduit.mate.academy/');
      cy.contains(article.title).should('not.exist');
    });
  });
});
