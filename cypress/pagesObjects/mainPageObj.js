/// <reference types='cypress' />

export default class MainPageObj {
  getProfileNavLink(username) {
    return cy.contains('a.nav-link', username.toLowerCase());
  }

  assureUserLoggedIn(username) {
    this.getProfileNavLink(username)
      .should('exist');
    this.yourFeedLink.should('exist');
  }

  get newArticleLink() {
    return cy.contains('a.nav-link', 'New Article');
  }

  clickNewArticleLink() {
    this.newArticleLink.click();
  }

  get yourFeedLink() {
    return cy.contains('a', 'Your Feed');
  }
}
