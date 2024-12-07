const { faker } = require('@faker-js/faker');

describe('Article flow', () => {
  let user;

  beforeEach(() => {
    cy.visit('/');

    cy.task('generateUser').then((data) => {
      user = data;
    });
  });

  it('user should be able to create an article', () => {
    const title = faker.lorem.words(5);
    const description = faker.lorem.sentence(7);
    const articleBody = faker.lorem.paragraph();
    const tags = faker.lorem.word();

    cy.login(user.email, user.username, user.password);
    cy.reload();

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
    const title = faker.lorem.words(5);
    const description = faker.lorem.sentence(8);
    const body = faker.lorem.paragraph();

    cy.login(user.email, user.username, user.password);
    cy.reload();

    cy.createArticle(title, description, body);

    cy.contains('.nav-link', 'Global Feed').click();
    cy.get('.article-preview').contains('h1', `Article title: ${title}`).click();

    cy.contains('.btn', 'Delete Article').type('{enter}');

    cy.contains('.nav-link', 'Global Feed').click();
    cy.get('h1').should('not.have.value', `Article title: ${title}`);
  });
});
