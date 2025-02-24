/// <reference types='cypress' />

export default class ProfilePageObj {
  visitProfilePage(username) {
    cy.visit(`${Cypress.config().baseUrl}/profile/${username}`);
  }

  get myPostsList() {
    return cy.get('.article-preview');
  }

  assurePostsListEmpty() {
    this.myPostsList.should('have.text', 'No articles are here... yet.');
  }
}
