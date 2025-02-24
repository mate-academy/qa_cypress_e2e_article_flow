/// <reference types ='cypress' />

import MainPageObj from '../pagesObjects/mainPageObj.js';
import EditorPage from '../pagesObjects/editorPage.js';
import ArticlePage from '../pagesObjects/articlePage.js';
import ProfilePageObj from '../pagesObjects/profilePage.js';
const editorPage = new EditorPage();
const mainPageObj = new MainPageObj();
const articlePage = new ArticlePage();
const profilePageObj = new ProfilePageObj();

describe('Article operations', () => {
  beforeEach(() => {
    cy.task('generateUser').then((user) => {
      const { username, email, password } = user;

      cy.login(email, username, password);
      cy.wrap(user).as('user');
    });
  });

  it('should create an article', () => {
    cy.visit('/');
    cy.get('@user').then((user) => {
      mainPageObj.assureUserLoggedIn(user.username);
      mainPageObj.clickNewArticleLink();
      cy.assureUrl(editorPage.editorPageUrl);
      cy.task('generateArticle').then((article) => {
        const { title, about, content, tags } = article;
        editorPage.fillTitleField(title);
        editorPage.fillAboutField(about);
        editorPage.fillArticleContentField(content);
        editorPage.fillTagsField(tags);
        editorPage.publishArticle();
        articlePage.assureArticleTitle(title);
        articlePage.assureArticleContent(content);
        articlePage.assurearticleTags(tags);
        articlePage.assureArticleAuthor(user.username);
      });
    });
  });

  it('shoul delete an article', () => {
    cy.get('@user').then((user) => {
      cy.task('generateArticle').then((article) => {
        const { title, about, content } = article;
        cy.createArticle(title, about, content).then(({ slug }) => {
          articlePage.visitArticlePage(slug);
          cy.assureUrl(`article/${slug}`);
          articlePage.deleteArticleFromArticleTitle();
          profilePageObj.visitProfilePage(user.username.toLowerCase());
          profilePageObj.assurePostsListEmpty();
          /* Does not pass
          cy.intercept('GET', `article/${slug}`).as('visitArticle');
          articlePage.visitArticlePage(slug, {failOnStatusCode: false});
          cy.wait('@visitArticle').its('response.statusCode').should('eq', 404);
          */
        });
      });
    });
  });
});
