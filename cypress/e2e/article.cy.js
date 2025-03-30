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
      .should('exist');
    cy.get('[placeholder="Article Title"]')
      .type(articleTitle);
    cy.get('[placeholder="Article Title"]')
      .should('have.value', articleTitle);
    cy.get('[placeholder="What\'s this article about?"]')
      .should('exist');
    cy.get('[placeholder="What\'s this article about?"]')
      .type(articleDescription);
    cy.get('[placeholder="What\'s this article about?"]')
      .should('have.value', articleDescription);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .should('exist');
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(articleBody);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .should('have.value', articleBody);
    cy.get('[placeholder="Enter tags"]')
      .should('exist');
    cy.get('[placeholder="Enter tags"]')
      .type(articleTags);
    cy.get('[placeholder="Enter tags"]')
      .should('have.value', articleTags);
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
        cy.get('h1').should('have.text', articleTitle);
        cy.get('.article-content').contains(articleBody).should('exist');
        cy.intercept('DELETE', `/api/articles/${articleSlug}`).as('deleteArticle');
        cy.get('.btn').contains('Delete Article').click();
        cy.wait('@deleteArticle').its('response.statusCode').should('eq', 204);
        cy.url().should('not.contain', 'articles');
      });
  });
});
