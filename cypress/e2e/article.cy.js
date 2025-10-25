/// <reference types="cypress" />

describe('Article flow', () => {
  it('should create a new article', () => {
    const timestamp = Date.now();
    const email = `user${timestamp}@mail.com`;
    const password = `Password${timestamp}!`;
    const username = `User${timestamp}`;

    const title = `Test Article ${timestamp}`;
    const description = `Description ${timestamp}`;
    const body = `Body content ${timestamp}`;
    const tag = 'TestTag';

    // Tworzenie użytkownika przez API
    cy.request({
      method: 'POST',
      url: 'https://conduit.mate.academy/api/users',
      body: {
        user: { username, email, password },
      },
    });

    // Logowanie
    cy.login(email, password);

    // Tworzenie artykułu
    cy.createArticle(title, description, body, [tag]);

    // Assercje po utworzeniu
    cy.contains(title).should('be.visible');
    cy.contains(description).should('be.visible');
    cy.get('.tag-list').contains(tag).should('be.visible');
  });

  it('should delete an article', () => {
    const timestamp = Date.now();
    const email = `user${timestamp}@mail.com`;
    const password = `Password${timestamp}!`;
    const username = `User${timestamp}`;

    const title = `Test Article ${timestamp}`;
    const description = `Description ${timestamp}`;
    const body = `Body content ${timestamp}`;
    const tag = 'TestTag';

    // Tworzenie użytkownika przez API
    cy.request({
      method: 'POST',
      url: 'https://conduit.mate.academy/api/users',
      body: {
        user: { username, email, password },
      },
    });

    // Logowanie
    cy.login(email, password);

    // Tworzymy artykuł do usunięcia
    cy.createArticle(title, description, body, [tag]);

    // Przechodzimy do artykułu
    cy.contains(title).click();

    // Usuwamy artykuł
    cy.contains('Delete Article').click();

    // Assercja, że artykuł został usunięty
    cy.contains(title).should('not.exist');
  });
});
