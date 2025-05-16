import { faker } from '@faker-js/faker';

describe('Conduit - Create and Delete Article Flow', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('should create a new article successfully', () => {
    const title = `Article ${faker.datatype.uuid()}`;
    const description = 'This is a description';
    const body = 'This is the body of the article';

    cy.contains('New Article').click();
    cy.get('[placeholder="Article Title"]').type(title);
    cy.get('[placeholder="What\'s this article about?"]').type(description);
    cy.get('[placeholder="Write your article (in markdown)"]').type(body);
    cy.get('[placeholder="Enter tags"]').type('testTag{enter}');
    cy.contains('Publish Article').click();

    cy.url().should('include', '/article/');
    cy.contains(title).should('exist');
    cy.contains(body).should('exist');
  });

  it('should delete an article successfully', () => {
    cy.createArticle().then((article) => {
      cy.visit(`/article/${article.slug}`);
      cy.contains('Delete Article').click();

      cy.url().should('eq', 'https://conduit.mate.academy/');
      cy.visit(`/article/${article.slug}`);
      cy.contains('Page not found').should('exist');
    });
  });
});

