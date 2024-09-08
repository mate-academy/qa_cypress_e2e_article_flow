const { faker } = require('@faker-js/faker');

describe('article', () => {
  before(() => {
    cy.task('generateUser')
      .then(({ username, email, password }) => {
        cy.login(email, username, password);
      });
  });

  it('should open login page', () => {
    cy.visit('/editor');

    cy.url().should('include', '/editor');

    cy.getByPlaceholder('Article Title')
      .type('article test');

    cy.getByPlaceholder('What\'s this article about?')
      .type('article test about');

    cy.getByPlaceholder('Write your article (in markdown)')
      .type('article about test data inside of article');

    cy.getByPlaceholder('Enter tags')
      .type('#test #test2article{Enter}');

    cy.contains('[type="button"]', 'Publish Article')
      .click();

    cy.url().should('include', '/article/article-test');
  });

  it('should delete an article', () => {
    const artTitle = faker.lorem.words({ min: 2, max: 5 });
    const artDescription = faker.lorem.words({ min: 5, max: 7 });
    const artBody = faker.lorem.paragraph(2);

    cy.createArticle(artTitle, artDescription, artBody)
      .then((art) => {
        const { slug, title, body } = art.body.article;

        cy.visit('/article/' + slug);

        cy.contains('p', body)
          .should('exist');

        cy.contains('h1', title)
          .should('exist');

        cy.contains('.btn-outline-danger', 'Delete Article')
          .click();

        cy.url().should('include', '/');
      });
  });
});
