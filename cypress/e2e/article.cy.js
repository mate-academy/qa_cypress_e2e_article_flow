/// <reference types="cypress" />
import { CreateNewArticle } from '../support/pages/createArticle.PageObject';
import { DeleteArticle } from '../support/pages/deleteArticle.PageObject';

const createArticle = new CreateNewArticle();
const deleteArticle = new DeleteArticle();

describe('User', () => {
  let user;
  let articleData;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticleData').then((generateArticleData) => {
      articleData = generateArticleData;
    });
  });

  it('is able to create an article', () => {
    cy.login(user.email, user.username, user.password);
    createArticle.visit();
    createArticle.titleField.type(articleData.title);
    createArticle.descriptionField.type(articleData.description);
    createArticle.articleBodyField.type(articleData.body);
    createArticle.publishArticleButton.click();
    createArticle.assertNewArticleUrl(articleData.title);
    createArticle.assertArticleTitleOnArticlePage(articleData.title);
    createArticle.assertArticleBodyOnArticlePage(articleData.body);
  });

  it('is able to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(articleData.title, articleData.description, articleData.body)
      .then((response) => {
        deleteArticle.visit(`/article/${response.body.article.slug}`);
      });
    deleteArticle.deleteArticleButton.click();
    deleteArticle.assertUrlAfterDeletingArticle();
    deleteArticle.assertArticlePreviewMessageIsExist();
  });
});
