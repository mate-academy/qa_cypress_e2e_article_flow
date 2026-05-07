import PageObject from './pageObject.js';
import HomePageObject from './home.pageObject.js';

class ArticlePageObject extends PageObject {
  url = '';

  get articleBody() {
    return cy.get('div p');
  }

  get articleTitle() {
    return cy.get('.container h1');
  }

  get editArticleLink() {
    return cy.get(`a[href^="/editor/"]`).contains('Edit Article');
  }

  get deleteArticleButton() {
    return cy.get(`button`).contains('Delete Article');
  }

  get tagList() {
    return cy.get('ul.tag-list li');
  }

  get followButton() {
    return cy.get('button').contains('Follow');
  }

  get addToFavouriteButton() {
    return cy.get('button').contains('Favorite');
  }

  get authorOfArticle() {
    return cy.get('a[href^="/profile/"][class="author"]').then((profile) => {
      return profile[0];
    });
  }

  clickOnAuthorOfProfile() {
    this.authorOfArticle.click();
  }

  checkArticleAuthor(author) {
    if (typeof author !== 'string') {
      throw new Error('The "author" argument must be String');
    }

    this.authorOfArticle.should('have.text', author);
  }

  clickOnFollowUnfollowBtn() {
    this.followButton.click();
  }

  assertTags(arrayOfTags) {
    if (!Array.isArray(arrayOfTags)) {
      throw new Error('"arrayOfTags" must be an Array');
    }

    this.tagList.then((tagBox) => {
      [...tagBox].forEach((tag, i) => {
        expect(tag.textContent).to.be.oneOf(arrayOfTags);
      });
    });
  }

  assertTitleText(expectedText) {
    if (typeof expectedText !== 'string') {
      throw new Error(
        '"expectedText" must be String');
    }
    this.articleTitle.contains(expectedText);
  }

  assertArticleBodyText(expectedText) {
    if (typeof expectedText !== 'string') {
      throw new Error('"expectedText" and "oldText" must be String');
    }

    this.articleBody.should('have.text', expectedText);
  }

  clickOnEditArticleLink() {
    this.editArticleLink.click();
  }

  clickOnDeleteArticleBtn() {
    this.deleteArticleButton.click();
  }
};

const homePrototype = HomePageObject.prototype;

ArticlePageObject.prototype.homeMixIn = {
  getLogo: homePrototype.clickLogo
    .bind(homePrototype),
  getHomeLink: homePrototype.clickHomeLink.bind(homePrototype),
  getNewArticleLink: homePrototype.clickNewArticleLink
    .bind(homePrototype),
  getSettingsLink: homePrototype.clickSettingsLink
    .bind(homePrototype),
  getUserLink: homePrototype.clickUserLink
    .bind(homePrototype)
};

export default ArticlePageObject;
