/// <reference types="cypress" />

describe('Article flow', () => {
  const uniqueId = Date.now();
  const user = {
    email: `user_${uniqueId}@example.com`,
    username: `user_${uniqueId}`,
    password: 'Password123!'
  };

  const articleForCreate = {
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
      cy.login(user.email, user.password);
    });

    it('should create a new article', () => {
      cy.visit('/');
      cy.contains('New Article').click();

      cy.get('input[placeholder="Article Title"]').type(articleForCreate.title);
      cy.get('input[placeholder="What\'s this article about?"]')
        .type(articleForCreate.description);
      cy.get('textarea[placeholder="Write your article (in markdown)"]')
        .type(articleForCreate.body);
      cy.get('input[placeholder="Enter tags"]')
        .type(`${articleForCreate.tagList.join(', ')}{enter}`);

      cy.contains('Publish Article').click();

      cy.url().should('include', '/article/');
      cy.contains(articleForCreate.title).should('be.visible');
      cy.contains(articleForCreate.body).should('be.visible');
    });
  });

  context('Delete article', () => {
    let articleForDelete;

    beforeEach(() => {
      cy.login(user.email, user.password);

      // Generate unique article for delete test
      const id = Date.now();
      articleForDelete = {
        title: `Deletable Article ${id}`,
        description: 'Article to be deleted in test',
        body: 'This article will be deleted by Cypress test',
        tagList: ['delete', 'cypress']
      };

      cy.createArticle(articleForDelete);
    });

    it('should delete the article successfully', () => {
      cy.contains(articleForDelete.title).click();
      cy.contains('Delete Article').click();

      cy.url().should('eq', 'https://conduit.mate.academy/');
      cy.contains(articleForDelete.title).should('not.exist');
    });
  });
});
