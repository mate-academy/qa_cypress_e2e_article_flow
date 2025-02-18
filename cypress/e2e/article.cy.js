import { faker } from '@faker-js/faker';

describe('User profile', () => {
  const title = faker.lorem.sentence();
  const description = faker.lorem.sentence();
  const body = faker.lorem.text();
  let user;

  before(() => {
    cy.task('generateUser').then((response) => {
      user = response;
      cy.login(user.email, user.username, user.password);
      cy.visit('/');
    });
  });

  it('should create and delete an article', () => {
    cy.createArticle(title, description, body).then(() => {
      cy.get(`[href="/profile/${user.username.toLowerCase()}"]`)
        .click();
      cy.contains('.article-preview', description).should('be.visible');
      cy.contains('.article-preview', title).click();
      cy.get('.article-page').find('h1').contains(title).should('be.visible');
      cy.get('.article-page').within(() => {
        cy.contains('p', body).should('be.visible');
      });

      cy.intercept('DELETE', '/api/articles/*').as('deleteArticle');
      cy.contains('button.btn', 'Delete Article').click();
      cy.wait('@deleteArticle');
      cy.contains('.link', 'Global Feed').click();
      cy.contains('.article-preview', title).should('not.exist');
      cy.contains('.article-preview', description).should('not.exist');
      cy.contains('.article-preview', body).should('not.exist');
    });
  });
});
