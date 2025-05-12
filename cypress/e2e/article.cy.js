import { faker } from '@faker-js/faker';

describe('Article flow', () => {
  const title = faker.lorem.words(3);
  const description = faker.lorem.sentence(3);
  const article = faker.lorem.sentence(20);
  const tag = faker.lorem.word();

  beforeEach(() => {
    cy.visit('/');

    cy.task('generateUser').then((data) => {
      const { email, username, password } = data;
      cy.login(email, username, password);
      cy.reload();
    });
  });

  it('User should be able to create an article', () => {
    cy.contains('.nav-link', 'New Article').click();

    cy.getPlaceholder('Article Title').type(title);
    cy.getPlaceholder('What\'s this article about?').type(description);
    cy.getPlaceholder('Write your article (in markdown)').type(article);
    cy.getPlaceholder('Enter tags').type(tag +'{enter}');

    cy.get('.btn').click();

    cy.contains('.nav-link', 'Home').click();
    cy.contains('.nav-link', 'Global Feed').click();
    cy.get('.article-preview').contains('h1', `Article title: ${title}`)
  });


  it('User should be able to delete the article', () => {
    cy.createArticle(title, description, article);

    cy.contains('.nav-link', 'Global Feed').click();
    cy.get('.article-preview').contains('h1', `Article title: ${title}`).click();

    cy.contains('button', 'Delete Article').click();

    cy.contains('.nav-link', 'Global Feed').click();
    cy.contains('.nav-link', 'Global Feed').should('not.contain.text', `Article title: ${title}`);
  });
});