import {generateArticle} from '../support/generateArticle.js';
import {generateUser} from '../support/generateUser.js';
describe('Conduit ', () => {
  const article = generateArticle();

  it('should allow to create an article', () => {
    const user = generateUser();
    cy.login(user.email, user.username, user.password);
    cy.visit('/');
    cy.get('.container > .nav > :nth-child(2) > .nav-link').click();

    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article').type(article.description);
    cy.findByPlaceholder('Write your article').type(article.body);
    cy.findByPlaceholder('Enter tags').type(`${article.tags}{enter}`);
    cy.get('.btn').click();

    cy.url().should('contain', article.title);
    cy.get('h1').should('contain', article.title);
  });

  it('should allow to delete an article', () => {
    const user = generateUser();
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
        cy.contains('.btn', 'Delete Article')
          .click();
      });
    cy.get(':nth-child(4) > .nav-link').click().click();
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
