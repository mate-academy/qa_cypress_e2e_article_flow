const { faker } = require('@faker-js/faker');

const generateArticle = () => {
  const uniqueId = faker.string.uuid();

  return {
    title: `QA article ${uniqueId}`,
    description: `QA description ${uniqueId}`,
    body: `QA body ${uniqueId}. ${faker.lorem.sentence()}`
  };
};

describe('Article flow', () => {
  let user;
  let article;

  beforeEach(() => {
    article = generateArticle();

    cy.visit('/');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user.email, user.username, user.password);
      cy.reload();
    });
  });

  it('creates an article', () => {
    cy.contains('a', 'New Article').click();
    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get('input[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.contains('button', 'Publish Article').click();

    cy.location('pathname').should('match', /^\/article\//);
    cy.get('h1').should('contain.text', article.title);
    cy.contains(article.body).should('be.visible');
  });

  context('when an article exists', () => {
    beforeEach(() => {
      cy.createArticle(
        article.title,
        article.description,
        article.body
      ).then((response) => {
        article.slug = response.body.article.slug;
      });
    });

    it('deletes the article', () => {
      cy.visit(`/article/${article.slug}`);
      cy.get('h1').should('contain.text', article.title);

      cy.on('window:confirm', () => true);
      cy.contains('button', 'Delete Article').first().click();

      cy.location('pathname').should('eq', '/');
      cy.request({
        url: `/api/articles/${article.slug}`,
        failOnStatusCode: false
      }).its('status').should('eq', 404);
    });
  });
});
