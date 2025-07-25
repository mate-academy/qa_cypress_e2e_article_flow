import { faker } from '@faker-js/faker';

describe('Article flow', () => {
  let user;
  const title = faker.lorem.word({ strategy: 'longest' });
  const description = faker.lorem.paragraph();
  const body = faker.lorem.paragraph(3);

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      cy.login(user.email, user.username, user.password);
    });
    cy.visit('/');
  });

  it('should create and then delete the article', () => {
    cy.contains(
      'a',
      user.username.toLowerCase())
      .should('be.visible');

    cy.createArticle(title, description, body);

    cy.contains('.nav-link', 'Global Feed').click();

    cy.get('.article-preview')
      .contains(
        '.author',
        user.username.toLowerCase());
    cy.get('.article-preview').first().click();
    cy.contains('.btn-outline-danger', ' Delete Article')
      .click();

    cy.visit('/');

    cy.contains('.nav-link', 'Global Feed').click();

    cy.get('.article-preview')
      .find('.author')
      .should('not.contain.text', user.username.toLowerCase());
  });
});
