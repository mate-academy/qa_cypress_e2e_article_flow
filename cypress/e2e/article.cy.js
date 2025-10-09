/// <reference types="cypress" />

describe('Article flow', () => {
  const timestamp = Date.now();
  const email = `user${timestamp}@test.com`;
  const username = `user${timestamp}`;
  const password = `Password123!`;

  before(() => {
    cy.login(email, username, password);
  });

  it('should create a new article', () => {
    cy.fixture('example.json').then((article) => {
      const title = `${article.name} ${timestamp}`;
      const description = article.email;
      const body = article.body;

      cy.visit('/editor');

      cy.get('input[placeholder="Article Title"]').type(title);
      cy.get('input[placeholder="What\'s this article about?"]').type(description);
      cy.get('textarea[placeholder="Write your article (in markdown)"]').type(body);

      cy.contains('button', 'Publish Article').click();

      cy.get('h1').should('contain.text', title);
    });
  });

  it('should delete an article', () => {
    cy.fixture('example.json').then((article) => {
      const title = `${article.name} ${timestamp}`;
      const description = article.email;
      const body = article.body;

      cy.createArticle(title, description, body);

      cy.visit(`/@${username}`);

      cy.contains('h1', title).click();

      cy.contains('button', 'Delete Article').click();

      cy.contains('h1', title).should('not.exist');
    });
  });
});

