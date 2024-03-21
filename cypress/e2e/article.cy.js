/// <reference types='cypress' />
const { generateUser } = require('../support/generateUser');
const { generateArticle } = require('../support/generateArticle');

describe('Conduit article editor', () => {
  beforeEach(() => {
    const user = generateUser();
    cy.login(user.email, user.username, user.password);
  });

  it('should allow to post an article', () => {
    const article = generateArticle();
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`/article/${response.body.article.slug}`);
      });
    cy.get('h1').should('contain.text', article.title);
    cy.get('p').should('contain.text', article.body);
  });

  it('should allow to delete posted article', () => {
    const article = generateArticle();
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`/article/${response.body.article.slug}`);
      });
    cy.contains('Delete Article').click();
    cy.url().should('eq', 'https://conduit.mate.academy/');
  });
});
