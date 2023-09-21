const faker = require('faker');

describe('Conduit', () => {
  const title = faker.lorem.word();
  const desc = faker.lorem.sentence();
  const body = faker.lorem.sentence();

  beforeEach(() => {
    cy.task('generateUser').then(user => {
      cy.login(user.email, user.username, user.password);
    });
    cy.visit('/');
  });

  it('should provide an ability to create the article', () => {
    cy.contains('New Article').click();
    cy.get('[placeholder="Article Title"]').type(title);
    cy.get('[placeholder^="What\'s this"]').type(desc);
    cy.get('[placeholder^="Write your"]').type(body);
    cy.contains('Publish Article').click();
    cy.get('h1').should('contain', title);
  });

  it('should provide an ability to delete the article', () => {
    cy.createArticle(title, desc, body);
    cy.get('[href^="/profile/"]').click();
    cy.contains(desc).click();
    cy.get('.article-actions .ion-trash-a').click();
    cy.wait(1000);
    cy.get('[href^="/profile/"]').click();
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
