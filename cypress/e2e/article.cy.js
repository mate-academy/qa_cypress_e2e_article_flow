const { faker } = require('@faker-js/faker');

describe('Article management', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      cy.login(user.email, user.username, user.password);

      article = {
        title: faker.lorem.sentence(4),
        description: faker.lorem.sentence(6),
        body: faker.lorem.paragraph()
      };
    });

    cy.visit('/');
  });

  it('should log in and create an article', () => {
    const normalizedUserName = user.username.toLowerCase();

    cy.contains('a', normalizedUserName).should('be.visible');

    cy.contains('a.nav-link', 'New Article').click();

    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get('input[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type(article.body);

    cy.contains('button', 'Publish Article').click();

    cy.url().should('include', '/article/');
    cy.contains('h1', article.title).should('be.visible');

    cy.get('li').contains('a.nav-link', 'Settings').click();

    cy.get('.btn-outline-danger').click();
  });

  it('should delete an article', () => {
    cy.createArticle(article.title, article.description, article.body);

    const normalizedUserName = user.username.toLowerCase();

    cy.contains('a', normalizedUserName).should('be.visible').click();

    cy.contains('.article-preview', article.title).click();

    cy.contains('button', 'Delete Article').should('be.visible').click();

    cy.url().should('eq', 'https://conduit.mate.academy/');
    cy.contains('No articles are here... yet.').should('be.visible');
  });
});
