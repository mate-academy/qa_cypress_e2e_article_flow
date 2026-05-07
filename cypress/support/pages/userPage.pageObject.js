import PageObject from './pageObject.js';
import { ArgumentError } from '../customComands.js';

class UserPageObject extends PageObject {
  url = '';
  name = '';

  constructor(profileName) {
    super();
    if (typeof profileName !== 'string') {
      throw new ArgumentError('The "profileName" argument must be String');
    }

    this.name = profileName;
    this.url = `profile/${profileName}`;
  }

  /**
   *
   * @param {string} title
   * @param {string} about
   */
  openArticle(title, about, reloadBefore = false) {
    if (typeof title !== 'string' || typeof about !== 'string' ||
      typeof reloadBefore !== 'boolean'
    ) {
      throw new ArgumentError('"title" and "about" ' +
        ' must be String. The "reloadBefore" must be Boolean');
    }

    if (reloadBefore) {
      cy.reload();
      cy.get(`.article-preview a[href^="/article/"]`)
        .contains(`.article-preview a[href^="/article/"]`, title)
        .contains(`.article-preview a[href^="/article/"]`, about)
        .click();
    } else {
      cy.get(`.article-preview a[href^="/article/"]`)
        .contains(`.article-preview a[href^="/article/"]`, title)
        .contains(`.article-preview a[href^="/article/"]`, about)
        .click();
    }
  }

  clickOnFollowUnfollowButton() {
    this.followUnfollowButton.click();
  }

  assertThatArticleNotExist(title, about) {
    if (typeof title !== 'string' || typeof about !== 'string') {
      throw new ArgumentError('The "title" and "about" arguments' +
        ' must be String');
    }

    cy.contains(`.article-preview a[href^="/article/"]`, title).should('not.exist');
    cy.contains(`.article-preview a[href^="/article/"]`, about).should('not.exist');
  }
}

export default UserPageObject;
