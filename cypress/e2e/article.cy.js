/* eslint-disable */

import { faker } from '@faker-js/faker';
import generateUser from '../support/user';
import ArticlePageObject from '../pages/article.pageObject';
import ArticleFeedsPageObject from '../pages/articleFeeds.pageObject';
import EditorPageObject from '../pages/editor.pageObject';

const articlePage = new ArticlePageObject();
const articleFeedsPage = new ArticleFeedsPageObject();
const editorPage = new EditorPageObject();

describe('Conduit', () => {
  let title;
  let description;
  let body;

  beforeEach(() => {
    const {username, email, password} = generateUser();

    title = faker.lorem.sentence({ min: 3, max: 5 });
    description = faker.lorem.sentence();
    body = faker.lorem.paragraphs(3);

    cy.login(email, username, password);
  });

  it('should allow user to create an article', () => {
    cy.visit('/editor');

    editorPage.verifyUrl();
    editorPage.fillAndSubmitForm(
      title,
      description,
      body
    );

    articlePage.verifyArticleHeader(title);
    articlePage.verifyArticleBody(body);
  });

  it('should allow a user to delete an article', () => {
    cy.createArticle(
      title,
      description,
      body
    ).then(response => {
      const articleSlug = response.body.article.slug;
      cy.visit(`article/${articleSlug}`)});

      articlePage.verifyArticleHeader(title);
      articlePage.verifyArticleBody(body);

      articlePage.clickDeleteArticleButton();

      cy.on('window:alert', (alertMessage) => {
        expect(alertMessage).to.eq('Are you sure you want to delete this article?');
      });
      
      cy.wait(3000);
      articleFeedsPage.verifyYourFeedTab();
      articleFeedsPage.verifyNoArticlesMessage();
    });
  });
