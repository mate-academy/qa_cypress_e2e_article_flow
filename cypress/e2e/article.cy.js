const { faker } = require('@faker-js/faker');
describe('Article flow', () => {
  let user;
  let articleTitle;
  let articleDescription;
  let articleBody;
  let articleTags;
  let articleSlug;
  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user.email, user.username, user.password);
      cy.visit('/');

      articleTitle = faker.lorem.words(3);
      articleDescription = faker.lorem.sentence(2);
      articleBody = faker.lorem.paragraphs(1);
      articleTags = faker.lorem.words(3);
    });
  });

  it('should create the article', () => {
    cy.get('a.nav-link[href="/editor"]').click();
    cy.get('[placeholder="Article Title"]')
      .should('exist')
      .type(articleTitle);
    cy.get('a.nav-link[href="/editor"]').click();
    cy.get('[placeholder="What\'s this article about?"]')
      .should('exist')
      .type(articleDescription);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .should('exist')
      .type(articleBody);
    cy.get('[placeholder="Enter tags"]')
      .should('exist')
      .type(articleTags);
    cy.get('.btn').contains('Publish')
      .should('exist')
      .and('not.be.disabled')
      .click();
    cy.url().should('include', '/article');
  });

  it('should delete the article', () => {
    cy.createArticle(articleTitle, articleDescription, articleBody)
      .then((response) => {
        expect(response.status).to.eq(200);
        articleSlug = response.body.article.slug;
        cy.visit(`/article/${articleSlug}`);
        cy.intercept('DELETE', `/api/articles/${articleSlug}`).as('deleteArticle');
        cy.get('.btn').contains('Delete Article').click();
        cy.wait('@deleteArticle').its('response.statusCode').should('eq', 204);
        cy.url().should('not.contain', 'articles');
      });
  });
});
