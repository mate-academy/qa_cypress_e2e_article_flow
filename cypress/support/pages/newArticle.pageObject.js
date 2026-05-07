// import { ArgumentError } from '../customCommands.js';
import PageObject from './pageObject.js';
import HomePageObject from './home.pageObject.js';

class NewArticlePageObject extends PageObject {
  url = '/editor';

  get articleTittleField() {
    return cy.get('form input[placeholder="Article Title"]');
  }

  get articleAboutField() {
    return cy.get('form input[placeholder^="What\'s"]');
  }

  get articleBodyTextArea() {
    return cy.get('form textArea[placeholder^="Write your article"]');
  }

  get articleTagsField() {
    return cy.get('form input[placeholder="Enter tags"]');
  }

  get articleSubmitButton() {
    return cy.get('form button').contains(/Update Article|Publish Article/);
  }

  insertArticleTittle(text) {
    if (typeof text !== 'string') {
      throw new Error('The "text" argument must be String');
    }

    this.articleTittleField
      .click()
      .clear()
      .type(text);
  }

  insertArticleAbout(text) {
    if (typeof text !== 'string') {
      throw new Error('The "text" argument must be String');
    }

    this.articleAboutField
      .click()
      .clear()
      .type(text);
  }

  insertArticleBody(text) {
    if (typeof text !== 'string') {
      throw new Error('The "text" argument must be String');
    }

    this.articleBodyTextArea
      .click()
      .clear()
      .type(text);
  }

  insertArticleTags(textOrArray) {
    const argType = Object.prototype.toString.call(textOrArray);
    const isArray = argType === '[object Array]';
    const isString = argType === '[object String]';
    const iterationLimit = (isString)
      ? 1
      : textOrArray.length;

    if (!(isString || isArray)) {
      throw new Error('The "text" argument must be String or Array');
    }

    for (let i = 0; i < iterationLimit; i++) { // interation dependend on type of data (String or Array)
      const elementToInput = (isArray)
        ? textOrArray[i]
        : textOrArray;

      if (i === 0) {
        this.articleTagsField
          .click()
          .clear()
          .type(elementToInput);

        this.articleTagsField
          .blur();

        continue;
      }

      this.articleTagsField
        .click()
        .type(elementToInput);
      this.articleTagsField
        .blur();
    }
  }

  clickOnSubmitButton() {
    this.articleSubmitButton
      .click();
    this.articleSubmitButton
      .should('not.be.disabled');
  }

  getAllTags() {
    return cy.get('.tag-list span');
  }

  deleteAllTags() {
    cy.get('.tag-list span i')
      .then((tags) => {
        for (let i = tags.length - 1; i >= 0; i--) {
          cy.get(tags[i]).click();
        }
      });
  }
}

const homePrototype = HomePageObject.prototype;

NewArticlePageObject.prototype.homeMixIn = {
  getLogo: homePrototype.clickLogo
    .bind(homePrototype),
  getHomeLink: homePrototype.clickHomeLink
    .bind(homePrototype),
  getNewArticleLink: homePrototype.clickNewArticleLink
    .bind(homePrototype),
  getSettingsLink: homePrototype.clickSettingsLink
    .bind(homePrototype),
  getUserLink: homePrototype.clickUserLink
    .bind(homePrototype)
};

export default NewArticlePageObject;
