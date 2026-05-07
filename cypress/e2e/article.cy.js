/// <reference types='cypress' />
/// <reference types='../support' />
import UserObj from '../support/userObject.js';
import HomePageObject from '../support/pages/home.pageObject.js';
import Article from '../support/articleObject.js';
import NewArticlePageObject from '../support/pages/newArticle.pageObject.js';
import ArticlePageObject from '../support/pages/articlePage.pageObject.js';
import SignUpPageObject from '../support/pages/signUp.pageObject.js';
import UserPageObject from '../support/pages/userPage.pageObject.js';

describe('article page', () => {
  const user = new UserObj();
  const homePage = new HomePageObject();
  const newArticlePage = new NewArticlePageObject();
  const articlePage = new ArticlePageObject();
  const article = new Article();
  const singUpPage = new SignUpPageObject();
  const userPage = new UserPageObject(user.username);

  before(() => {
    singUpPage.visit();
    singUpPage.registerViaGUI(user.username, user.email, user.password, false);
    cy.location('pathname').should('equal', '/');
  });

  beforeEach(() => {
    cy.login(user.email, user.password);
    cy.visit(homePage.url);
  });

  it('should provide an ability to create an article', () => {
    homePage.clickNewArticleLink();
    newArticlePage.insertArticleTittle(article.version1.title);
    newArticlePage.insertArticleAbout(article.version1.about);
    newArticlePage.insertArticleBody(article.version1.body);
    newArticlePage.insertArticleTags(article.version1.tags);
    newArticlePage.clickOnSubmitButton();
    articlePage.assertTitleText(article.version1.title);
    articlePage.assertArticleBodyText(article.version1.body);
    articlePage.assertTags(article.version1.tags);
    articlePage.clickOnAuthorOfProfile();
    userPage.openArticle(article.version1.title, article.version1.about);
  });

  it('should provide an ability to delete an article', () => {
    cy.createArticle(
      article.version2.title, article.version2.about, article.version2.body);
    homePage.clickUserLink();
    userPage.openArticle(article.version2.title, article.version2.about);
    articlePage.clickOnDeleteArticleBtn();
    homePage.clickUserLink();
    cy.reload();
    userPage.assertThatArticleNotExist(
      article.version2.title, article.version2.about);
  });
});
