/// <reference types='cypress' />

const { ar } = require("faker/lib/locales");

describe('Article', () => {
let user;
let article;

  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  it('Should provide an ability to create an article for lig-in user', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]')
      .type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.get('[placeholder="Enter tags"]')
      .type(article.tag);
    cy.get('.btn')
      .click();
    cy.get('.banner')
      .should('contain', article.title)
    cy.get('.article-content')
      .should('contain', article.body);
    cy.get('.tag-default')
      .should('contain', article.tag);
  });

  it.only('Should provide an ability to delete teh article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(
      article.title,
      article.description,
      article.body).then(response => {
        const slug = response.body.article.slug;
      cy.visit(`/article/${slug}`);
      });
    cy.contains('.btn', ' Delete Article')
      .eq(0)
      .click();
    cy.contains('.nav-link', 'Global Feed')
      .should('be.visible');
    cy.contains('.article-preview', article.title)
      .should('not.exist');
    cy.contains('.article-preview', article.description)
      .should('not.exist');
    cy.contains('.article-preview', article.tag)
      .should('not.exist');
  });
});
