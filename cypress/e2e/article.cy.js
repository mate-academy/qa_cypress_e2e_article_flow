const faker = require('faker');

describe('Article creation and deletion', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should provide an ability for the article creation', () => {
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);
      const articleData = {
        title: faker.random.word(),
        description: faker.random.word(),
        body: faker.random.word(),
        tag: faker.random.word()
      };

      cy.createArticle(
        articleData.title,
        articleData.description,
        articleData.body,
        articleData.tag
      );

      cy.visit('/editor');
      cy.get('[placeholder="Article Title"]').type(articleData.title);
      cy.get('[placeholder^="What\'s this"]').type(articleData.description);
      cy.get('[placeholder^="Write your"]').type(articleData.body);
      cy.get('[placeholder="Enter tags"]').type(articleData.tag);

      cy.contains('button', 'Publish Article').click({ force: true }); // eslint-disable-line cypress/no-force
      cy.contains('h1', articleData.title).should('be.visible');
      cy.url().should('include', 'article');
    });
  });

  it('should provide an ability for the article deletion', () => {
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);
      const articleData = {
        title: faker.random.word(),
        description: faker.random.word(),
        body: faker.random.word(),
        tag: faker.random.word()
      };

      cy.createArticle(
        articleData.title,
        articleData.description,
        articleData.body,
        articleData.tag
      ).then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
        cy.get('.article-actions .ion-trash-a').click({ multiple: true });
      });
      cy.url().should('not.include', 'article');
    });
  });
});
