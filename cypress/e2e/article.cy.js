import PageObject from '../support/PageObject';
import EditArticlePageObject from '../support/pages/editArticle.PageObject';
import ArticlePageObject from '../support/pages/article.PageObject';

require('faker/lib/locales');

const page = new PageObject();
const editArticle = new EditArticlePageObject();
const articlePage = new ArticlePageObject();

describe('Conduit app', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((geneeateArticle) => {
      article = geneeateArticle;
    });
  });

  it('should provide the ability to create article', () => {
    cy.login(user.email, user.username, user.password);
    editArticle.visit();
    editArticle.titleField.type(article.title);
    editArticle.descriptionField.type(article.description);
    editArticle.bodyField.type(article.body);
    editArticle.publishButton.click();

    articlePage.articleTitle.should('contain', article.title);
  });

  it('should provide the ability to delete article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`article/${response.body.article.slug}`);

        articlePage.deleteButton.click();
        cy.on('window:confirm', () => true);
      });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    page.profileButton.click();
    cy.get('.article-preview').should('contain', 'No articles are here... yet');
  });
});
