import faker from 'faker';
// eslint-disable-next-line max-len
import { CreateArticlePageObject } from '../support/pages/createArticle.pageObject';

describe('Article', () => {
  const createArticlePage = new CreateArticlePageObject();
  const article = {
    name: faker.random.words(5),
    description: faker.random.words(5),
    body: faker.random.words(10)
  };

  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should be created via New Article Page', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    createArticlePage.titleField.type(article.name);
    cy.get(':nth-child(2) > .form-control')
      .type(article.description);
    createArticlePage.bodyField.type(article.body);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    createArticlePage.publishButton.click({ force: true });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    // eslint-disable-next-line max-len
    cy.get('.article-actions > .article-meta > :nth-child(3) > .btn-outline-secondary')
      .should('be.visible');
    cy.get('h1').should('contain', article.name);
  });

  // eslint-disable-next-line max-len
  it('article should be deleted, after creating by createArticle method', () => {
    cy.login(user.email, user.username, user.password);

    createArticlePage.visit();
    createArticlePage.titleField.type(article.name);
    cy.get(':nth-child(2) > .form-control')
      .type(article.description);
    createArticlePage.bodyField.type(article.body);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    createArticlePage.publishButton.click({ force: true });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.contains(' Delete Article')
      .click();
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
