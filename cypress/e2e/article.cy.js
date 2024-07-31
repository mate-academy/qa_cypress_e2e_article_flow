import { faker } from '@faker-js/faker';

describe('Article Flow', () => {
  beforeEach(() => {
    cy.visit('https://conduit.mate.academy/');
  });

  it('Create and Delete Article', () => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email().toLowerCase(),
      password: '12345Qwert!'
    };

    // Registering a new user
    cy.get('a').contains('Sign up').click();
    cy.url().should('include', '/register');
    cy.get('input[placeholder="Username"]').type(user.username);
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('button').contains('Sign up').click();

    // Ensure user is logged in by checking for an element visible on the main page after login
    cy.get('a').contains('New Article').should('exist'); // Перевірка наявності кнопки "New Article"

    // Create an article
    cy.get('a').contains('New Article').click();
    cy.url().should('include', '/editor');
    cy.get('input[placeholder="Article Title"]').type('hello');
    cy.get('input[placeholder="What\'s this article about?"]').type('idk');
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type('qamay24');
    cy.get('button').contains('Publish Article').click();

    // Delete an article
    cy.get('button').contains('Delete Article').click();
  });
});
