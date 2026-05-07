import PageObject from './pageObject.js';
import UserObj from '../userObject.js';

class HomePageObject extends PageObject {
  url = '/#/';

  get logo() {
    return cy.get('nav a').contains('conduit');
  }

  get homeLink() {
    return cy.get('nav a').contains('Home');
  }

  get newArticleLink() {
    return cy.get('nav a').contains('New Article');
  }

  get settingsLink() {
    return cy.get('nav a').contains('Settings');
  }

  get userLink() {
    return cy.get('nav a [alt]').closest('a');
  }

  get signInLink() {
    return cy.get('a').contains('Sign in');
  }

  get signUpLink() {
    return cy.get('a').contains('Sign up');
  }

  get globalFeed() {
    return cy.get('a').contains('Global Feed');
  }

  get yourFeed() {
    return cy.get('a').contains('Your Feed');
  }

  clickGlobalFeedSection() {
    this.globalFeed.click();
  }

  clickYourFeedSection() {
    this.yourFeed.click();
  }

  clickSettingsLink() {
    this.settingsLink.click();
  }

  clickLogo() {
    this.logo.click();
  }

  clickHomeLink() {
    this.homeLink.click();
  }

  clickNewArticleLink() {
    this.newArticleLink.click();
  }

  clickUserLink() {
    this.userLink.click();
  }

  assertHeaderContainUsername(username) {
    this.userLink
      .should('contain', username);
  }

  clickSignUpLink() {
    this.signUpLink.click();
  }

  clickSignInLink() {
    this.signInLink.click();
  }
}

const userPagePrototype = UserObj.prototype;

HomePageObject.prototype.userPageMixIn = {
  openArticle: userPagePrototype.openArticle
};

export default HomePageObject;
