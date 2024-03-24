/// <reference types = 'cypress' />

const { ArticlePage } = require('../support/PageObjects/ArticlePage');

let user = {};
let article = {};

const articlePage = new ArticlePage();

describe('Article flow', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should create an article', () => {
    cy.login(user);
    cy.visit('/editor');

    articlePage.createArticle(article);
    articlePage.assertArticleCreation(article);
  });

  it('should delete an article', () => {
    cy.login(user);
    cy.createArticle(article).then((response) => {
      const slug = response.body.article.slug;

      cy.visit(`/article/${slug}`);
    });

    cy.contains(article.title).click();
    cy.get('.ion-trash-a').first().click();

    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
