/// <reference types="cypress" />

describe('Article flow', () => {
  const email = `user${Date.now()}@test.com`;
  const password = 'Password123!';
  const username = `user${Date.now()}`;

  const articleTitle = `Article ${Date.now()}`;
  const articleDescription = 'Test article description';
  const articleBody = 'This is a test article body';

  before(() => {
    cy.login({
      email,
      password,
      username,
    });
  });

  it('should create an article', () => {
    cy.visit('/editor');

    cy.get('[placeholder="Article Title"]').type(articleTitle);
    cy.get('[placeholder="What\'s this article about?"]').type(
      articleDescription,
    );
    cy.get('[placeholder="Write your article (in markdown)"]').type(
      articleBody,
    );

    cy.contains('button', 'Publish Article').click();

    cy.contains(articleTitle).should('be.visible');
    cy.contains(articleBody).should('be.visible');
  });

  describe('Delete article', () => {
    let deleteArticleTitle;
    let deleteArticleDescription;
    let deleteArticleBody;

    beforeEach(() => {
      deleteArticleTitle = `Delete Article ${Date.now()}`;
      deleteArticleDescription = 'Article for deletion';
      deleteArticleBody = 'Body of article to delete';

      cy.createArticle({
        title: deleteArticleTitle,
        description: deleteArticleDescription,
        body: deleteArticleBody,
      });
    });

    it('should delete the article', () => {
      cy.visit('/');

      cy.contains(deleteArticleTitle).click();

      cy.contains('button', 'Delete Article').click();

      cy.contains('Global Feed').click();

      cy.contains(deleteArticleTitle).should('not.exist');
    });
  });
});
