const { faker } = require('@faker-js/faker');

describe('Article flow', () => {
  const title = faker.lorem.words(5);
  const description = faker.lorem.sentence(7);
  const articleBody = faker.lorem.paragraph();
  const tags = faker.lorem.word();

  beforeEach(() => {
    cy.visit('/');

    cy.task('generateUser').then((data) => {
      const { email, username, password } = data;

      cy.login(email, username, password);
      cy.reload();
    });
  });

  it('user should be able to create an article', () => {
    cy.contains('.nav-link', 'New Article').click();

    cy.getPlaceholder('Article Title').type(title);
    cy.getPlaceholder('What\'s this article about?').type(description);
    cy.getPlaceholder('Write your article (in markdown)').type(articleBody);
    cy.getPlaceholder('Enter tags').type(tags + '{enter}');

    cy.get('.btn').click();

    cy.contains('.nav-link', 'Home').click();
    cy.contains('.nav-link', 'Global Feed').click();
    cy.get('.article-preview').contains('h1', `Article title: ${title}`);
  });

  it('user should be able to delete the article', () => {
    cy.createArticle(title, description, articleBody);

    cy.contains('.nav-link', 'Global Feed').click();
    cy.get('.article-preview').contains('h1', `Article title: ${title}`).click();

    cy.contains('button', 'Delete Article').type('{enter}');

    cy.contains('.nav-link', 'Global Feed').click();
    cy.get('h1').should('not.have.value', `Article title: ${title}`);
  });
});
