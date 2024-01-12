import { CreateArticlePageObject } from '../support/CreateArticle.pageObject';

// eslint-disable-next-line n/handle-callback-err
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Conduit article', () => {
  const createArticlePage = new CreateArticlePageObject();
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be able to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/');
    cy.contains('New Article').click();
    createArticlePage.titleField.type(article.title);
    createArticlePage.descriptionField.type(article.description);
    createArticlePage.bodyField.type(article.body);
    createArticlePage.clickPublishArticle();

    cy.contains('.container', article.title).should('exist');
  });

  it.only('should be able to delete an article', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`article/${slug}`);
        cy.get('.article-page')
          .should('contain', article.title);
        cy.get('.article-page')
          .should('contain', article.body);
      });

    cy.contains('.btn', 'Delete Article').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you really want to delete it?');
    });
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
