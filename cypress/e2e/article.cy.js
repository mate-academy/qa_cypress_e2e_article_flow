import { faker } from '@faker-js/faker';

describe('Article flow', () => {
  let article;

  beforeEach(function() {
    const id = faker.string.uuid();

    article = {
      title: `Article ${id}`,
      description: `Description ${id}`,
      body: `Body ${id}`
    };

    cy.login(`qa-${id}@example.com`, `qa-${id}`,
      faker.internet.password({ length: 20 }));

    if (this.currentTest.title === 'should delete the article') {
      cy.createArticle(article.title, article.description, article.body)
        .then((response) => {
          cy.wrap(response.body.article.slug).as('articleSlug');
          cy.visit(`/article/${response.body.article.slug}`);
        });
    }
  });

  it('should create an article', () => {
    cy.visit('/editor');
    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get('input[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type(article.body);

    cy.intercept('POST', '**/api/articles').as('publishArticle');
    cy.contains('button', 'Publish Article').click();
    cy.wait('@publishArticle').then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body.article).to.include(article);
      cy.location('pathname')
        .should('eq', `/article/${response.body.article.slug}`);
    });

    cy.get('h1').should('have.text', article.title);
    cy.get('.article-content').should('contain.text', article.body);
  });

  it('should delete the article', () => {
    cy.get('h1').should('have.text', article.title);
    cy.intercept('DELETE', '**/api/articles/*').as('deleteArticle');
    cy.contains('button', 'Delete Article').first().click();
    cy.wait('@deleteArticle').its('response.statusCode').should('eq', 204);
    cy.location('pathname').should('eq', '/');
    cy.get('.article-preview').should('not.contain.text', article.title);

    cy.get('@articleSlug').then((slug) => {
      cy.request({
        url: `/api/articles/${slug}`,
        failOnStatusCode: false
      }).its('status').should('eq', 404);
    });
  });
});
